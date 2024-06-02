import dynamic from 'next/dynamic';
import { mergeClasses } from '@/helpers/className';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRef, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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

const ReportContent = (props) => {
    const { data, handleSubmit } = props;
    const [selectedGender, setSelectedGender] = useState(genders[0].identifier);
  
    const rwFieldRef = useRef();
    const nameFieldRef = useRef();
    const addressFieldRef = useRef();
    const ageFieldRef = useRef();
  
    const handleSelectGender = (identifier) => setSelectedGender(identifier);

    const handleSubmitReport = (e) => {
        const value = {
            id: data?.id,
            rw: rwFieldRef.current.value,
            name: nameFieldRef.current.value,
            address: addressFieldRef.current.value,
            gender: selectedGender,
            age: parseInt(ageFieldRef.current.value),
        };
        handleSubmit(e, value);
    };
  
    return (
      <form onSubmit={handleSubmitReport} autoComplete="false" className={mergeClasses('mt-7', 'flex flex-col gap-3')}>
        <Input 
          ref={rwFieldRef}
          id="report-input-rw"
          name="rw"
          placeholder="RW"
          value={`RW ${data?.number}`}
          label="RW"
          disabled
          required
        />
        <Input 
          ref={addressFieldRef}
          id="report-input-address"
          name="address"
          placeholder="Alamat lengkap pasien"
          label="Alamat Lengkap"
          required
        />
        <Input 
          ref={nameFieldRef}
          id="report-input-name"
          name="name"
          placeholder="Nama lengkap pasien"
          label="Nama"
          required
        />
        <Input 
          ref={ageFieldRef}
          id="report-input-age"
          name="age"
          placeholder="Usia pasien"
          label="Usia"
          type="number"
          min="1"
          required
        />
        <div>
          <label className='text-md'>Jenis Kelamin</label>
          <div className='flex gap-2'>
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

export default ReportContent;