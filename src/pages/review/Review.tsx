import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ResearchReview from './ResearchReview';
import MethodologyReview from './MethodologyReview';
import CourseReview from './CourseReview';
import ActivityReview from './ActivityReview';
import AppliedReview from './AppliedReview';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
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
                    {/* <Typography>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const tabNames = [
    { name: 'Applied', id: 0 ,element:<AppliedReview/>},
    { name: 'Activity', id: 1 ,element:<ActivityReview/>},
    { name: 'Research', id: 2 ,element:<ResearchReview/>},
    { name: 'Methodology', id: 3 ,element:<MethodologyReview/>},
    { name: 'Course', id: 4 , element:<CourseReview/>},
]

const renderTab = () => {
    return tabNames.map((tab) => <Tab key={tab.id} label={tab.name} {...a11yProps(tab.id)} />)
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const renderTabPannel = () => {
        return tabNames.map((tab) => (<TabPanel key={tab.id} value={value} index={tab.id}>
            {tab.element}
        </TabPanel>))
    }
    // const renderTabPannel = () => {
    //     return 
    //     <>
    //     <TabPanel value={value} index={0}>
    //         {`${tab.name}Review`}
    //     </TabPanel>))
    //     </>
    // }

    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {renderTab()}
                </Tabs>
            </Box>
            {renderTabPannel()}
        </Box>
        </>
    );
}
