import dynamic from 'next/dynamic';
import { mergeClasses } from '@/helpers/className';
import DataVisualizationBox from '@/components/DataVisualizationBox';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRef, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useSession } from 'next-auth/react';

const PieChart = dynamic(() => import('@/modules/incidentrate/components/PieChart'), { ssr: false });

const ReportContent = () => {
  const genders = [
    {
      identifier: 'male',
      color: '#4682B4',
      label: 'Laki-laki',
    }, {
      identifier: 'female',
      color: '#FF69B4',
      label: 'Perempuan',
    }
  ];
  const [selectedGender, setSelectedGender] = useState(genders[0].identifier);

  const rwFieldRef = useRef();
  const nameFieldRef = useRef();
  const addressFieldRef = useRef();
  const ageFieldRef = useRef();

  const handleSelectGender = (identifier) => setSelectedGender(identifier);


  const handleSubmit = (e) => {
    e.preventDefault();
    window.showNotification({
      message: 'Saat ini submisi laporan masih belum dibuka, harap coba lagi nanti',
      type: 'error'
    })
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="false" className={mergeClasses('mt-7', 'flex flex-col gap-3')}>
      <Input 
        ref={rwFieldRef}
        id="report-input-rw"
        name="rw"
        placeholder="RW"
        value="RW 03"
        label="Nama RW"
        disabled
        required
      />
      <Input 
        ref={addressFieldRef}
        id="report-input-address"
        name="address"
        placeholder="Alamat lengkap korban"
        label="Alamat Lengkap"
        required
      />
      <Input 
        ref={nameFieldRef}
        id="report-input-name"
        name="name"
        placeholder="Nama lengkap korban"
        label="Nama"
        required
      />
      <Input 
        ref={ageFieldRef}
        id="report-input-age"
        name="age"
        placeholder="Usia korban"
        label="Usia"
        type="number"
        min="1"
        required
      />
      <div>
        <label className='text-md'>Jenis Kelamin</label>
        <div className='flex gap-4'>
          {genders.map((gender) => {
            let Icon;
            switch (gender.identifier) {
              case 'male':
                Icon = MaleIcon;
                break;
              case 'female' : 
                Icon = FemaleIcon;
                break;
              
              default:
                Icon = OthersIcon;
                break;
            }
            const isSelected = gender.identifier === selectedGender;
            const className = mergeClasses(
              'w-full mt-1 py-4',
              'flex flex-col items-center justify-center',
              'rounded-lg border-2',
              'text-md',
              'cursor-pointer',
              'border-gray-200 text-gray-300'
            );

            return (
              <div
                className={className}
                onClick={() => handleSelectGender(gender.identifier)}
                {...(isSelected && { 
                    style: {
                      borderColor: gender.color,
                      color: gender.color
                    }
                })}
              >
                <Icon className='text-[64px]'/>
                <span>{gender.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Button type="submit" className='mt-4 py-3 rounded-xl'>Submit</Button>
    </form>
  )
};

const InfoContent = (props) => {
  const { data, pieChartDataGender, pieChartDataAge, onReport } = props;
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
      <Button className={mergeClasses('!bg-red-600 hover:!bg-red-700', 'mt-8')} onClick={onReport}>Laporkan Kasus Baru</Button>
    </div>
  )
};

const DrawerInfo = (props) => {
    const { open, handleClose, data } = props;
    const { data: session } = useSession();
    const [openReport, setOpenReport] = useState(false);
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

    const handleOpenReport = () => {
      if (session) {
        setOpenReport(true);
      } else {
        window.showNotification({
          message: 'Harap login terlebih dahulu untuk dapat mengirim laporan',
          type: 'error'
        })
      }
    };
    return (
        <div className={mergeClasses(
            'absolute right-0 top-0 z-[1000]',
            'w-[425px] h-screen py-5 px-4',
            'overflow-y-auto',
            'bg-white border border-gray-200',
            `${open ? '' : 'translate-x-full'} transition-transform duration-300`
          )}>
            <div className='flex items-start justify-between'>
                <div>
                  {openReport ? (
                    <>
                      <h2 className='text-2xl font-medium'>Laporkan Kasus Baru</h2>
                      {/* <p className='text-md text-gray-400'>Rw 03 - Keputih, Kec. Sukolilo, Surabaya, Jawa Timur 60111</p> */}
                    </>
                  ) : (
                    <>
                      <h2 className='text-2xl font-medium'>Data Kerawanan RW 03</h2>
                      <p className='text-md text-gray-400'>Keputih, Kec. Sukolilo, Surabaya, Jawa Timur 60111</p>
                    </>
                  )}
                </div>
                <CloseIcon className="cursor-pointer" onClick={() => openReport ? setOpenReport(false) : handleClose()} />
            </div>
            {openReport ? (
              <ReportContent />
            ) : (
              <InfoContent
                data={data}
                pieChartDataGender={pieChartDataGender}
                pieChartDataAge={pieChartDataAge}
                onReport={handleOpenReport}
              />
            )}
        </div>
    );
}

export default DrawerInfo;