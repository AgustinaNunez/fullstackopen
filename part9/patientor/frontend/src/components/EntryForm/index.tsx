import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import { Entry } from '../../types';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const EntryForm: React.FC<{entries: Entry[]}> = ({entries}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {index: 0, label: 'Health Check', form: <HealthCheckEntryForm entries={entries} />},
    {index: 1, label: 'Hospital', form: <HospitalEntryForm entries={entries} />},
    {index: 2, label: 'Occupational Healthcare', form: <OccupationalHealthcareEntryForm entries={entries} />},
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map(tab => <Tab label={tab.label} {...a11yProps(tab.index)} />)}
        </Tabs>
      </Box>
      {
        tabs.map(tab => (
          <CustomTabPanel value={value} index={tab.index}>
            {tab.form}
          </CustomTabPanel>
        ))
      }
    </Box>
  );
};

export default EntryForm;