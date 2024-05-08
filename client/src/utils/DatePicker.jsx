import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export default function DatePickerValue({formState, setFormState}) {
  // const [value, setValue] = useState(dayjs('DD-MM-YYYY'));
  const isMobile = useMediaQuery('(max-width:670px)');


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>

        {!isMobile ? (
          <DatePicker
          label="Transaction"
          value={dayjs(formState.date)}
          onChange={(date) => setFormState({...formState, date})}
        />
        ) : (
          <MobileDatePicker
          label="Transaction"
          value={dayjs(formState.date)}
          onChange={(date) => setFormState({...formState, date})}
        />
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
