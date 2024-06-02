import dynamic from 'next/dynamic';
import Layout from '@/modules/layout';
import { useEffect, useState, useCallback } from 'react';
import DrawerInfo from '@/modules/incidentrate/components/InfoDrawer';
import rwGeoJson from '@/components/Map/geojson/rw.json';
import { VULNERABILITY_LEVELS } from '@/modules/incidentrate/helpers/constants';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import useCollectionCount from '@/hooks/useCollectionCount';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const InformasiDbdPage = () => {
  const [sideInfoOpen, setSideInfoOpen] = useState(false);
  const [sideInfoData, setSideInfoData] = useState();
  const [loading, setLoading] = useState(true);
  const [riskData, setRiskData] = useState();
  const [riskLevelList, setRiskLevelList] = useState([]);

  const { data: listDataRw, loading: loadingFetchingDataRw } = useFetchingDocs({
    collection: 'rw'
  });

  const [fetchCount] = useCollectionCount({ lazyFetch: true });
  const layoutProps = {
    useMobileEdge: true
  };

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
    // const randomIndex = Math.floor(Math.random() * 3);
    // const vulnerabilityLevelKeys = Object.keys(VULNERABILITY_LEVELS)
    // const vulnerabilityLevelColors = vulnerabilityLevelKeys.map((key) => VULNERABILITY_LEVELS[key].COLOR);
    // const color = vulnerabilityLevelColors[randomIndex];
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

  const calculateMetricScoring = (metricValue, lowestMetricValue, highestMetricValue, debug = false) => {
    let classScoring;
    const interval = (highestMetricValue - lowestMetricValue) / 3;
    const classOneConditionFullfiled = (lowestMetricValue <= metricValue) && (metricValue <= interval);
    const classTwoConditionFullfiled = (interval <= metricValue) && (metricValue <= (2 * interval));
    const classThreeConditionFullfiled = ((2 * interval) <= metricValue) && (metricValue <= highestMetricValue); 
    
    if (classOneConditionFullfiled) classScoring = 1
    else if (classTwoConditionFullfiled) classScoring = 2
    else if (classThreeConditionFullfiled) classScoring = 3
    if (debug) {
      console.log({
        interval,
        metricValue,
        lowestMetricValue,
        highestMetricValue,
        classOneConditionFullfiled,
        classTwoConditionFullfiled,
        classThreeConditionFullfiled
      })
    }
    return classScoring;
  };

  const calculateFinalScoring = (metrics = {}) => {
    const { totalCase, healthcareDist, larvaePercentage, populationDensity } = metrics;

    const totalCaseScoring = calculateMetricScoring(totalCase.value, totalCase.lowestValue, totalCase.highestValue);
    const healthcareDistScoring = calculateMetricScoring(healthcareDist.value, healthcareDist.lowestValue, healthcareDist.highestValue);
    const larvaePercentageScoring = calculateMetricScoring(larvaePercentage.value, larvaePercentage.lowestValue, larvaePercentage.highestValue);
    const populationDensityScoring = calculateMetricScoring(populationDensity.value, populationDensity.lowestValue, populationDensity.highestValue);
    const finalScoring = totalCaseScoring + healthcareDistScoring + larvaePercentageScoring + populationDensityScoring;
    return finalScoring;
  };

  const calculateRiskLevel = (rwId, rwScoringList) => {
    let riskLevel;
    const scoringList = rwScoringList.map((rw) => rw.score);
    const currentRwScore = rwScoringList.find((rw) => rw.rw === rwId).score;
    const lowestRwScore = Math.min(...scoringList);
    const highestRwScore = Math.max(...scoringList);

    const interval = (highestRwScore - lowestRwScore) / 3;
    const classOneConditionFullfiled = (lowestRwScore <= currentRwScore) && (currentRwScore <= lowestRwScore + interval);
    const classTwoConditionFullfiled = (lowestRwScore + interval < currentRwScore) && (currentRwScore <= lowestRwScore + 2 * interval);
    const classThreeConditionFullfiled = (lowestRwScore + 2 * interval < currentRwScore) && (currentRwScore <= highestRwScore); 
    
    if (classOneConditionFullfiled) riskLevel = 1
    else if (classTwoConditionFullfiled) riskLevel = 2
    else if (classThreeConditionFullfiled) riskLevel = 3
    
    // const riskLevel = calculateMetricScoring(currentRwScore, lowestRwScore, highestRwScore, true);
    return riskLevel;
  };

  useEffect(() => {
    const getMetric = (rwList, rwId, fieldGetter = () => {}) => {
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
                  // const riskScoring = calculateFinalScoring({
                    //   totalCase: totalCaseMetric,
                    //   healthcareDist: healthcareDistMetric,
                    //   larvaePercentage: larvaePercentageMetric,
                    //   populationDensity: populationDensityMetric 
                  // })
                  
                  // console.log(result.id, riskScoring);
                });
                
                const scoringList = riskDataList.map((rwRiskData) => {
                  const totalCaseMetric = getMetric(riskDataList, rwRiskData.id, (rw) => rw.report_count);
                  const healthcareDistMetric = getMetric(riskDataList, rwRiskData.id, (rw) => rw.initial_reports.healthcare_dist);
                  const larvaePercentageMetric = getMetric(riskDataList, rwRiskData.id, (rw) => rw.initial_reports.larvae_percentage);
                  const populationDensityMetric = getMetric(riskDataList, rwRiskData.id, (rw) => rw.initial_reports.population_density);
                  const riskScoring = calculateFinalScoring({
                    totalCase: totalCaseMetric,
                    healthcareDist: healthcareDistMetric,
                    larvaePercentage: larvaePercentageMetric,
                    populationDensity: populationDensityMetric,
                  })
                  return { rw: rwRiskData.id, score: riskScoring };
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
    <Layout {...layoutProps} >
        <div className='w-full h-screen absolute top-0 left-0 z-[1]'>
        {loading ? <Map />
        : (
          <Map 
            geoJson={rwGeoJson}
            geoJsonStyle={generateGeoJsonStyle}
            data={listDataRw}
            onFeatureClick={handleClickRw}
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

export default InformasiDbdPage;