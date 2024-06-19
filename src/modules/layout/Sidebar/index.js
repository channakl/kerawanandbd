import React, { useRef, useState } from 'react';
import SidebarMobile from '@modules/layout/Sidebar/mobile';
import Button from '@/components/Button';
import SidebarContent from '@/modules/layout/Sidebar/content';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { useSession } from 'next-auth/react';
import useAddDoc from '@/hooks/useAddDoc';
import Cookies from 'js-cookie';
import { useAccountContext } from '@/contexts/accountContext';
import { KSH_STATUS } from '@root/src/helpers/constants';

const Sidebar = () => {
    const { data: session } = useSession();
    const { updateKshStatus } = useAccountContext();
    const [modalRegistrationOpen, setModalRegistrationOpen] = useState(false);
    const { addDocument: register} = useAddDoc();
    const [NIK, setNIK] = useState('');
    const nameInputRef = useRef();
    const nikInputRef = useRef();

    const handleOpenRegistrationModal = () => {
        setModalRegistrationOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register({
            collection: 'ksh_accounts',
            docData: {
                accepted: false,
                confirmation_email_sent: false,
                email: session.user.email,
                name: nameInputRef.current.value,
                nik: nikInputRef.current.value,
            }, 
        })
        .then((res) => {
            Cookies.remove('ksh_fetched');
            updateKshStatus(KSH_STATUS.UNDER_REVIEW);
            window.setLoaderVisibility(false);
            window.showNotification({
              message: 'Registrasi berhasil!',
              type: 'info'
            })
            setModalRegistrationOpen(false);
        })
        .catch((e) => {
            window.setLoaderVisibility(false);
            console.log(e);
            window.showNotification({
                message: 'Submisi registrasi gagal dikirim!',
                type: 'error'
            })
        })
    };

    const handleChangeNIK = (e) => {
        setNIK(e.target.value.replace(/[^\d]/g, ''));
    };

    return (
        <>
            <SidebarMobile handleRegisterKSH={handleOpenRegistrationModal} />
            <nav className='hidden md:flex h-screen bg-white w-[390px] max-w-[33vw] pt-10 pb-4 px-4 text-gray-500 border-gray-200 border z-50 flex-col justify-between'>
               <SidebarContent handleRegisterKSH={handleOpenRegistrationModal} /> 
            </nav>
            <Modal
                title="Daftar Sebagai KSH"
                description="Daftar sebagai perwakilan KSH (Kader Surabaya Hebat) untuk dapat mengirimkan laporan kasus baru di daerah Anda"
                onClose={() => setModalRegistrationOpen(false)}
                open={modalRegistrationOpen}
            >
                <form onSubmit={handleSubmit}>
                    <Input 
                        ref={nameInputRef}
                        name="name"
                        placeholder="Masukkan Nama Lengkap"
                        label="Nama Lengkap"
                        required
                    />
                    <Input 
                        ref={nikInputRef}
                        name="nik"
                        placeholder="Masukkan NIK"
                        label="NIK"
                        className="mt-2"
                        minLength={16}
                        maxLength={16}
                        min={16}
                        max={16}
                        onChange={handleChangeNIK}
                        value={NIK}
                        required
                    />
                    <Button className="mt-6" type="submit">Submit</Button>
                    <p className='text-gray-400 text-md mt-2'>*Akun yang Anda buat akan menjalani proses review oleh tim kami yang mungkin memerlukan waktu beberapa saat. Anda akan menerima email konfirmasi setelah akun Anda disetujui dan siap untuk digunakan</p>
                </form>
            </Modal>
        </>
    )
}

export default Sidebar;