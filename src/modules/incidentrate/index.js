import dynamic from 'next/dynamic';
import Layout from '@/modules/layout';
import { useEffect, useState, useCallback } from 'react';
import DrawerInfo from '@/modules/incidentrate/components/InfoDrawer';
import rwGeoJson from '@/components/Map/geojson/rw.json';
import { VULNERABILITY_LEVELS } from '@/modules/incidentrate/helpers/constants';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import useCollectionCount from '@/hooks/useCollectionCount';
import { classifyPopulationDensity, discretize } from '@/modules/incidentrate/helpers/calculation';
import { classifyDensity, discretize } from '@/modules/incidentrate/helpers/calculation';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const IncidentRate = () => {
  const propsLayout = {
    title: 'Incident Rate'
  };

  const [sideInfoOpen, setSideInfoOpen] = useState(false);
  const [sideInfoData, setSideInfoData] = useState();
  const [loading, setLoading] = useState(true);
  const [riskData, setRiskData] = useState();
  const [riskLevelList, setRiskLevelList] = useState([]);

  const { data: listDataRw, loading: loadingFetchingDataRw } = useFetchingDocs({
    collection: 'rw'
  });

  const [fetchCount] = useCollectionCount({ lazyFetch: true });

  const generateGeoJsonStyle = (feature) => {
    const correspondRwData = listDataRw.find((rw) => feature.properties.Nama === `RW ${rw.number}`);
    const correspondRwRiskLevel = riskLevelList.find((riskLevel) => riskLevel.rw == correspondRwData.id).riskLevel;
    let color;
    switch (correspondRwRiskLevel) {
      case 1:
        color = VULNERABILITY_LEVELS.LOW.COLOR;
        break;
      case 2:
        color = VULNERABILITY_LEVELS.MEDIUM.COLOR;
        break;
      case 3:
        color = VULNERABILITY_LEVELS.HIGH.COLOR;
        break;
    }
    return {
        fillColor: color,
        color: '#FFF',
        weight: 1,
        fillOpacity: 0.55,
    };
  };

  const handleCloseInfoDrawer = () => {
    setSideInfoOpen(false);
  };
 
  useEffect(() => {
    if (riskLevelList?.length > 0) {
        setLoading(false);
    }
  }, [riskLevelList]);

  useEffect(() => {
    if (loading) {
      window.setLoaderVisibility(true);
    } else {
      window.setLoaderVisibility(false);
    }
  }, [loading]);

  const calculateRiskLevel = (rwId, rwScoringList) => {
    const scoringList = rwScoringList.map((rw) => rw.score);
    const currentRwScore = rwScoringList.find((rw) => rw.rw === rwId).score;
    const lowestRwScore = Math.min(...scoringList);
    const highestRwScore = Math.max(...scoringList);
    const riskLevel = discretize({
      value: currentRwScore,
      lowestValue: lowestRwScore,
      highestValue: highestRwScore
    });
    
    return riskLevel;
  };

  useEffect(() => {
    const getMetricRange = (rwList, rwId, fieldGetter = () => {}) => {
      const currentRw = rwList.find((rw) => rw.id === rwId);
      const value = fieldGetter(currentRw);
      const valueList = rwList.map(fieldGetter);
      const lowestValue = Math.min(...valueList);
      const highestValue = Math.max(...valueList);

      return { value, lowestValue, highestValue };
    };

    if (listDataRw) {
        const fetchAllCounts = async () => {
            try {
                const promises = listDataRw.map((rw) => {
                    return fetchCount({
                        parentCollection: 'rw',
                        parentDocId: rw.id,
                        subCollection: 'reports'
                    });
                });
                const results = await Promise.all(promises);
                const riskDataList = results.map((result) => {
                  const dataRW = listDataRw.find((rw) => rw.id === result.id);
                  const mergedRiskData = { ...dataRW, report_count: result.count + dataRW.initial_reports.total };
                  return mergedRiskData;
                });
                
                const scoringList = riskDataList.map((rwRiskData) => {
                  const totalCaseMetricRange = getMetricRange(riskDataList, rwRiskData.id, (rw) => rw.report_count);
                  const healthcareDistMetricRange = getMetricRange(riskDataList, rwRiskData.id, (rw) => rw.initial_reports.healthcare_dist);
                  const larvaePercentageMetricRange = getMetricRange(riskDataList, rwRiskData.id, (rw) => rw.initial_reports.larvae_percentage);
                  const populationDensityValue = rwRiskData.initial_reports.population_density;
                  const densityValue = rwRiskData.initial_reports.density;

                  const totalCaseClass = discretize(totalCaseMetricRange);
                  const healthcareDistClass = discretize(healthcareDistMetricRange);
                  const larvaePercentageClass = discretize(larvaePercentageMetricRange, { reverse: true });
                  const populationDensityClass = classifyPopulationDensity(populationDensityValue);
                  const densityClass = classifyDensity(densityValue);

                  const finalScoring = totalCaseClass + healthcareDistClass + larvaePercentageClass + populationDensityClass + densityClass;
                  return { rw: rwRiskData.id, score: finalScoring };
                })
                
                const riskLevelList = scoringList.map((rwScoring) => ({
                  rw: rwScoring.rw,
                  riskLevel: calculateRiskLevel(rwScoring.rw, scoringList)
                }));
                setRiskLevelList(riskLevelList)
            } catch (err) {
              window.showNotification({
                message: err,
                type: 'error',
                duration: 5000,
              })
            }
        };

        fetchAllCounts();
    }
}, [listDataRw]);
  
  const handleClickRw = async (e) => {
    const openedRw = e.sourceTarget.feature.properties.Nama;
    const openedRWData = listDataRw?.find((rw) => openedRw === `RW ${rw.number}`);
    setSideInfoOpen(true);
    setSideInfoData(openedRWData);
  };

  const handleMouseOverRw = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFF',
      fillOpacity: 0.9,
    });
  };

  const handleMouseOutRW = (e) => {
    const layer = e.target;
    layer.setStyle({
      color: '#FFF',
      weight: 1,
      fillOpacity: 0.55,
    });
  };

  return (
    <Layout {...propsLayout} >
        <div className='w-full h-screen absolute top-0 left-0 z-[1]'>
        {loading ? <Map />
        : (
          <Map 
            geoJson={rwGeoJson}
            geoJsonStyle={generateGeoJsonStyle}
            data={listDataRw}
            onFeatureClick={handleClickRw}
            onFeatureTouchStart={handleClickRw}
            onFeatureMouseOver={handleMouseOverRw}
            onFeatureMouseOut={handleMouseOutRW}
          />
        )}
        </div>
        <DrawerInfo
          open={sideInfoOpen}
          handleClose={handleCloseInfoDrawer}
          data={sideInfoData} />
    </Layout>
  )
}

export default IncidentRate;