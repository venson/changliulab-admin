import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ResearchReviewList from './ResearchReviewList';
import MethodologyReviewList from './MethodologyReviewList';
import CourseReviewList from './CourseReviewList';
import ActivityReviewList from './ActivityReviewList';
import AppliedReviewList from './AppliedReviewList';
import { useLocation, useNavigation, useParams, useRoutes, useSearchParams } from 'react-router-dom';
import { useRedirect } from 'react-admin';
import { FC, Fragment } from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const type = tabData[index].query
    // const type = value;
    console.log('value', value)
    console.log('index', index)



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
const tabData = [
    { name: 'Applied', element: <AppliedReviewList />, query: '' },
    { name: 'Activity', element: <ActivityReviewList />, query: 'activity' },
    { name: 'Research', element: <ResearchReviewList />, query: 'research' },
    { name: 'Methodology', element: <MethodologyReviewList />, query: 'methodology' },
    { name: 'Course', element: <CourseReviewList />, query: 'course' },
]


const ReviewList:FC = () => {
    const [query, setQuery] = useSearchParams();
    const type = query.get('type') ?? '';

    const redirect = useRedirect()
    const value = tabData.findIndex((tab) => tab.query === type) > 0 ? tabData.findIndex((tab) => tab.query === type) : 0
    // console.log(value)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        redirect(`/review?type=${tabData[newValue].query}`)
    };
    const renderTabPannel = () => {
        return tabData.map((tab, index) => (<TabPanel key={index} value={value} index={index}>
            {tab.element}
        </TabPanel>))
    }
    const renderTab = () => {
        return tabData.map((tab, index) => <Tab key={index} label={tab.name} {...a11yProps(index)} />)
    }

    return (
        <Fragment>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {renderTab()}
                    </Tabs>
                </Box>
                {renderTabPannel()}
            </Box>
        </Fragment>
    );
}

export default ReviewList