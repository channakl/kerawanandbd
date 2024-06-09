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
import StatisticsContent from '@/modules/incidentrate/components/StatisticsContent';
import ReportContent from '@/modules/incidentrate/components/ReportContent';
import useAddDoc from '@/hooks/useAddDoc';

const DrawerInfo = (props) => {
    const { open, handleClose, data } = props;
    const { data: session } = useSession();
    const [openReport, setOpenReport] = useState(false);
    const { addDocument: submitReport, error } = useAddDoc();

    if (!data) {
      return (
        <div className={mergeClasses(
          'absolute right-0 top-0 z-[1000]',
          'w-[425px] max-w-full h-screen py-5 px-4',
          'overflow-y-auto',
          'bg-white border border-gray-200',
          `${open ? '' : 'translate-x-full'} transition-transform duration-300`
        )} />
      );
    };

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

    const handleSubmitReport = (e, value) => {
      e.preventDefault();
      window.showNotification({
        message: 'Laporan berhasil dikirim!',
        type: 'info'
      })
      return;
      e.preventDefault();
      window.setLoaderVisibility(true);
      submitReport({
        parentCollection: 'rw',
        parentDocId: value.id,
        subCollection: 'reports',
        docData: {
          reported_by_email: session.user.email,
          patient: {
            name: value.name,
            address: value.address,
            age: value.age,
            gender: value.gender,
          }
        }, 
      })
      .then((res) => {
        window.setLoaderVisibility(false);
        window.showNotification({
          message: 'Laporan berhasil dikirim!',
          type: 'info'
        })
        setOpenReport(false);
      })
      .catch((e) => {
        window.setLoaderVisibility(false);
        console.log(e)
        window.showNotification({
          message: 'Laporan gagal dikirim!',
          type: 'error'
        })
      })
    };

    return (
        <div className={mergeClasses(
            'absolute right-0 top-0 z-[1000]',
            'w-[425px] max-w-full  h-screen py-5 px-4',
            'overflow-y-auto',
            'bg-white border border-gray-200',
            `${open ? '' : 'translate-x-full'} transition-transform duration-300`
          )}>
            <div className='flex items-start justify-between'>
                <div>
                  <h2 className='text-2xl font-medium'>
                    {openReport ? 'Laporkan Kasus Baru' : `Data Kerawanan RW ${data.number}`}
                  </h2>
                </div>
                <CloseIcon className="cursor-pointer" onClick={() => openReport ? setOpenReport(false) : handleClose()} />
            </div>
            {openReport ? (
              <ReportContent
                data={data}
                handleSubmit={handleSubmitReport}
              />
            ) : (
              <StatisticsContent
                data={data}
                onReport={handleOpenReport}
              />
            )}
        </div>
    );
}

export default DrawerInfo;