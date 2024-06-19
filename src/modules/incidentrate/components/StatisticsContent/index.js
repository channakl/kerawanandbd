import dynamic from 'next/dynamic';
import { mergeClasses } from '@/helpers/className';
import Button from '@/components/Button';
import DataVisualizationBox from '@/components/DataVisualizationBox';
import { useEffect, useState } from 'react';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import { useAccountContext } from '@/contexts/accountContext';
import { KSH_STATUS } from '@/helpers/constants';

const PieChart = dynamic(() => import('@/modules/incidentrate/components/PieChart'), { ssr: false });
const LineChart = dynamic(() => import('@/modules/incidentrate/components/LineChart'), { ssr: false });

const StatisticsContent = (props) => {
  const { data, onReport } = props;
  if (!data) {
    return null;
  }

  const { kshStatus } = useAccountContext();
  const [fetchReportsData, { data: reportsData }] = useFetchingDocs({ lazyFetch: true });
  const [fetchLarvaeData, { data: larvaeData }] = useFetchingDocs({ lazyFetch: true });
  const [fields, setFields] = useState();

  useEffect(() => {
    if (open && data) {
        fetchReportsData({
          parentCollection: 'rw',
          parentDocId: data.id,
          subCollection: 'reports'
        })
        fetchLarvaeData({
          parentCollection: 'rw',
          parentDocId: data.id,
          subCollection: 'mosquito_larvae'
        })
    }
  }, [open, data]);

  const calculateTotalCases = () => {
    const totalInitialReports = data.initial_reports.total;
    const totalReports = reportsData?.length || 0;
  
    const totalCases = totalInitialReports + totalReports;
    const newCases = totalReports;
    return { total: totalCases, new: newCases };
  };

  const calculateCasesByGender = (gender) => {
    const totalInitialReports = data.initial_reports.total_by_gender[gender];
    const totalReports = reportsData && reportsData.length && reportsData.length > 0
      ? reportsData.filter((report) => report.patient.gender === gender).length
      : 0

    const totalCases = totalInitialReports + totalReports;
    const newCases = totalReports;
    return { total: totalCases, new: newCases };
  };

  const calculateCasesByAgeRange = (minAge, maxAge) => {
    const totalInitialReports = data.initial_reports.total_by_age[`range_${minAge}_to_${maxAge}`];
    const totalReports = reportsData && reportsData.length && reportsData.length > 0
      ? reportsData.filter((report) => report.patient.age >= minAge && report.patient.age <= maxAge).length
      : 0

    const totalCases = totalInitialReports + totalReports;
    const newCases = totalReports;
    return { total: totalCases, new: newCases };
  };
  useEffect(() => {
    if (reportsData) {
      setFields({
        total_cases: calculateTotalCases(),
        male_cases: calculateCasesByGender('male'),
        female_cases: calculateCasesByGender('female'),
        age_0_to_3_cases: calculateCasesByAgeRange(0, 3),
        age_4_to_12_cases: calculateCasesByAgeRange(4, 12),
        age_13_to_24_cases: calculateCasesByAgeRange(13, 24),
        age_25_to_60_cases: calculateCasesByAgeRange(25, 60),
      })
    }
  }, [reportsData]);  
  
  if (!fields) return null;
  
  const lineChartDataLarvae = larvaeData && larvaeData.length > 0
    ? larvaeData
        .sort((a, b) => a.week - b.week)
        .map((larvaeData) => ({
            name: `Week ${larvaeData?.week}`,
            Kuantitas: larvaeData?.quantity
        }))
    : [];
  const pieChartDataGender = [
    { name: 'Pria`', value: fields.male_cases.total, fill: '#4682B4' },
    { name: 'Wanita', value: fields.female_cases.total, fill: '#FF69B4' },
  ];
  const pieChartDataAge = [
      { name: '0 - 3  Tahun', value: fields.age_0_to_3_cases.total },
      { name: '4 - 12  Tahun', value: fields.age_4_to_12_cases.total },
      { name: '13 - 24  Tahun', value: fields.age_13_to_24_cases.total },
      { name: '25 - 60  Tahun', value: fields.age_25_to_60_cases.total },
  ];

  return (
    <div>
      <DataVisualizationBox
        color="teal-500"
        title="Total Kasus"
        titleColor="white"
        className="mt-5"
      >
        <h4 className={mergeClasses(
          'text-white text-4xl font-bold',
          'mt-2'
        )}>{fields.total_cases.total} Kasus</h4>
        <h5 className='text-sm text-white'>+{fields.total_cases.new} Kasus Baru</h5>
      </DataVisualizationBox>

      {/* By Gender */}
      <div className={mergeClasses('mt-6', 'statistic-by-gender')}>
        <h3 className='uppercase text-gray-400 text-md font-medium'>Kasus Berdasarkan Gender</h3>
        <div className={mergeClasses(
          'flex gap-2',
          'mt-1'
        )}>
          <DataVisualizationBox title="Kasus Pria">
            <h4 className={mergeClasses(
              'text-3xl font-bold text-gray-800',
              'mt-2'
            )}>{fields.male_cases.total} Kasus</h4>
            <h5 className='text-sm text-red-500'>+{fields.male_cases.new} Kasus Baru</h5>
          </DataVisualizationBox>
          <DataVisualizationBox title="Kasus Wanita">
            <h4 className={mergeClasses(
              'text-3xl font-bold text-gray-800',
              'mt-2'
            )}>{fields.female_cases.total} Kasus</h4>
            <h5 className='text-sm text-red-500'>+{fields.female_cases.new} Kasus Baru</h5>
          </DataVisualizationBox>
        </div>
        {fields.total_cases.total > 0 && (
          <DataVisualizationBox title="Statistik" className="mt-2">
            <div className='flex'>
              <PieChart data={pieChartDataGender} />
            </div>
          </DataVisualizationBox>
        )}
      </div>


      {/* By Age Range */}
      <div className={mergeClasses('mt-6', 'statistic-by-age')}>
        <h3 className='uppercase text-gray-400 text-md font-medium'>Kasus Berdasarkan Usia</h3>
        <div className={mergeClasses(
          'flex flex-wrap justify-center gap-2',
          'mt-1'
        )}>
          <DataVisualizationBox title="Usia 0 - 3 Tahun" className="basis-[calc(50%_-_4px)]">
            <h4 className={mergeClasses(
              'text-3xl font-bold text-gray-800',
              'mt-2'
            )}>{fields.age_0_to_3_cases.total} Kasus</h4>
            <h5 className='text-sm text-red-500'>+{fields.age_0_to_3_cases.new} Kasus Baru</h5>
          </DataVisualizationBox>
          <DataVisualizationBox title="Usia 4 - 12 Tahun" className="basis-[calc(50%_-_4px)]">
            <h4 className={mergeClasses(
              'text-3xl font-bold text-gray-800',
              'mt-2'
            )}>{fields.age_4_to_12_cases.total} Kasus</h4>
            <h5 className='text-sm text-red-500'>+{fields.age_4_to_12_cases.new} Kasus Baru</h5>
          </DataVisualizationBox>
          <DataVisualizationBox title="Usia 13 - 24 Tahun" className="basis-[calc(50%_-_4px)]">
            <h4 className={mergeClasses(
              'text-3xl font-bold text-gray-800',
              'mt-2'
            )}>{fields.age_13_to_24_cases.total} Kasus</h4>
            <h5 className='text-sm text-red-500'>+{fields.age_13_to_24_cases.new} Kasus Baru</h5>
          </DataVisualizationBox>
          <DataVisualizationBox title="Usia 25 - 60 Tahun" className="basis-[calc(50%_-_4px)]">
            <h4 className={mergeClasses(
              'text-3xl font-bold text-gray-800',
              'mt-2'
            )}>{fields.age_25_to_60_cases.total} Kasus</h4>
            <h5 className='text-sm text-red-500'>+{fields.age_25_to_60_cases.new} Kasus Baru</h5>
          </DataVisualizationBox>
        </div>
        {fields.total_cases.total > 0 && (
          <DataVisualizationBox title="Statistik" className="mt-2">
            <div className='flex'>
              <PieChart data={pieChartDataAge} />
            </div>
          </DataVisualizationBox>
        )}
      </div>

      {/* Larvae */}
      <div className={mergeClasses('mt-6', 'statistic-by-age')}>
        <h3 className='uppercase text-gray-400 text-md font-medium'>Jentik Nyamuk</h3>
        <DataVisualizationBox title="Statistik Mingguan" className="mt-2 overflow-x-auto">
          <LineChart data={lineChartDataLarvae}/>
        </DataVisualizationBox>
      </div>
      {kshStatus === KSH_STATUS.UNDER_REVIEW && (
        <div>
          <Button className={mergeClasses('!bg-red-500 hover:!bg-red-600', 'mt-8')} onClick={onReport} disabled>Laporkan Kasus Baru</Button>
          <p className='w-full text-center text-md text-gray-700 mt-1'>*Akun Anda masih dalam proses review</p>
        </div>
      )}
      {kshStatus === KSH_STATUS.REGISTERED && (
        <Button className={mergeClasses('!bg-red-500 hover:!bg-red-600', 'mt-8')} onClick={onReport}>Laporkan Kasus Baru</Button>
      )}
    </div>
  )
};

export default StatisticsContent;