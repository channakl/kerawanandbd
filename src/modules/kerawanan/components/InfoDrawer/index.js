import dynamic from 'next/dynamic';
import { mergeClasses } from '@/helpers/className';
import DataVisualizationBox from '@/components/DataVisualizationBox';
import CloseIcon from '@mui/icons-material/Close';

const PieChart = dynamic(() => import('@/modules/kerawanan/components/PieChart'), { ssr: false });

const DrawerInfo = (props) => {
    const { open, handleClose, data } = props;
    const pieChartDataGender = [
        { name: 'Pria', value: data.case_by_gender.male, fill: '#4682B4' },
        { name: 'Wanita', value: data.case_by_gender.female, fill: '#FF69B4' },
    ];
    const pieChartDataAge = [
        { name: '0 - 12  Tahun', value: data.case_by_age_range.range_0_to_12 },
        { name: '13 - 23  Tahun', value: data.case_by_age_range.range_13_to_23 },
        { name: '24 - 60  Tahun', value: data.case_by_age_range.range_24_to_60 },
        { name: '61 - 100  Tahun', value: data.case_by_age_range.range_61_to_100 },
    ];
    return (
        <div className={mergeClasses(
            'absolute right-0 top-0 z-[1000]',
            'w-[450px] h-screen py-4 px-4',
            'overflow-y-auto',
            'bg-white border border-gray-200',
            `${open ? '' : 'translate-x-full'} transition-transform duration-300`
          )}>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-medium'>Data Kerawanan RW 03</h2>
                <CloseIcon className="cursor-pointer" onClick={handleClose}/>
            </div>
            <div>
              <DataVisualizationBox
                color="teal-500"
                title="Total Kasus"
                titleColor="white"
                className="mt-4"
              >
                <h4 className={mergeClasses(
                  'text-white text-4xl font-bold',
                  'mt-2'
                )}>{data.total_cases} Kasus</h4>
                <h5 className='text-sm text-gray-200'>+124 Kasus Baru</h5>
              </DataVisualizationBox>

              <div className={mergeClasses('mt-6', 'statistic-by-gender')}>
                <h3 className='uppercase text-gray-400 text-md font-medium'>Berdasarkan Gender</h3>
                <div className={mergeClasses(
                  'flex gap-2',
                  'mt-1'
                )}>
                  <DataVisualizationBox title="Kasus Pria">
                    <h4 className={mergeClasses(
                      'text-3xl font-bold text-gray-800',
                      'mt-2'
                    )}>{data.case_by_gender.male} Kasus</h4>
                    <h5 className='text-sm text-red-500'>+50 Kasus Baru</h5>
                  </DataVisualizationBox>
                  <DataVisualizationBox title="Kasus Wanita">
                    <h4 className={mergeClasses(
                      'text-3xl font-bold text-gray-800',
                      'mt-2'
                    )}>{data.case_by_gender.female} Kasus</h4>
                    <h5 className='text-sm text-red-500'>+74 Kasus Baru</h5>
                  </DataVisualizationBox>
                </div>
                <DataVisualizationBox title="Statistik" className="mt-2">
                  <div className='flex'>
                    <PieChart data={pieChartDataGender} />
                  </div>
                </DataVisualizationBox>
              </div>

              <div className={mergeClasses('mt-6', 'statistic-by-age')}>
                <h3 className='uppercase text-gray-400 text-md font-medium'>Berdasarkan Usia</h3>
                <div className={mergeClasses(
                  'flex flex-wrap justify-center gap-2',
                  'mt-1'
                )}>
                  <DataVisualizationBox title="Usia 0 - 12 Tahun" className="basis-[calc(50%_-_4px)]">
                    <h4 className={mergeClasses(
                      'text-3xl font-bold text-gray-800',
                      'mt-2'
                    )}>{data.case_by_age_range.range_0_to_12} Kasus</h4>
                    <h5 className='text-sm text-red-500'>+50 Kasus Baru</h5>
                  </DataVisualizationBox>
                  <DataVisualizationBox title="Usia 13 - 23 Tahun" className="basis-[calc(50%_-_4px)]">
                    <h4 className={mergeClasses(
                      'text-3xl font-bold text-gray-800',
                      'mt-2'
                    )}>{data.case_by_age_range.range_13_to_23} Kasus</h4>
                    <h5 className='text-sm text-red-500'>+74 Kasus Baru</h5>
                  </DataVisualizationBox>
                  <DataVisualizationBox title="Usia 24 - 60 Tahun" className="basis-[calc(50%_-_4px)]">
                    <h4 className={mergeClasses(
                      'text-3xl font-bold text-gray-800',
                      'mt-2'
                    )}>{data.case_by_age_range.range_24_to_60} Kasus</h4>
                    <h5 className='text-sm text-red-500'>+50 Kasus Baru</h5>
                  </DataVisualizationBox>
                  <DataVisualizationBox title="Usia 61 - 100 Tahun" className="basis-[calc(50%_-_4px)]">
                    <h4 className={mergeClasses(
                      'text-3xl font-bold text-gray-800',
                      'mt-2'
                    )}>{data.case_by_age_range.range_61_to_100} Kasus</h4>
                    <h5 className='text-sm text-red-500'>+74 Kasus Baru</h5>
                  </DataVisualizationBox>
                </div>
                <DataVisualizationBox title="Statistik" className="mt-2">
                  <div className='flex'>
                    <PieChart data={pieChartDataAge} />
                  </div>
                </DataVisualizationBox>
              </div>
            </div>
            <button className={mergeClasses(
                'bg-red-600',
                'w-full mt-8 p-3 rounded-lg',
                'text-md text-white font-medium',
                'hover:bg-red-700'
            )}>
                Report Kasus Baru
            </button>
        </div>
    );
}

export default DrawerInfo;