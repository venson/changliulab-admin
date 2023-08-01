import "./App.css";
import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvier } from "./dataProvider";
import authProvider from "./authProvider/authProvider";
import MemberList from "./pages/member/MemberList";
import MemberEdit from "./pages/member/MemberEdit";
import MemberCreate from "./pages/member/MemberCreate";
import ResearchList from "./pages/research/ResearchList";
import ResearchEdit from "./pages/research/ResearchEdit";
import ResearchCreate from "./pages/research/ResearchCreate";
import MethodologyEdit from "./pages/methodology/MethodologyEdit";
import MethodologyList from "./pages/methodology/MethodologyList";
import MethodologyCreate from "./pages/methodology/MethodologyCreate";
import ActivityEdit from "./pages/activity/ActivityEdit";
import ActivityList from "./pages/activity/ActivityList";
import ActivityCreate from "./pages/activity/ActivityCreate";
import BannerEdit from "./pages/banner/BannerEdit";
import BannerList from "./pages/banner/BannerList";
import BannerCreate from "./pages/banner/BannerCreate";
import CLayout from "./layout/layout";
import PermissionList from "./pages/permission/PermissionList";
import PermissionEdit from "./pages/permission/PermissionEdit";
import Icon from '@mui/material/Icon'
import PermissionCreate from "./pages/permission/PermissionCreate";
import RoleList from "./pages/role/RoleList";
import UserList from "./pages/user/UserList";
import UserCreate from "./pages/user/UserCreate"
import {QueryClient} from 'react-query'
import ScholarEdit from "@/pages/scholar/ScholarEdit";
import ScholarList from "@/pages/scholar/ScholarList";
import ScholarCreate from "@/pages/scholar/ScholarCreate";
import ReviewList from '@/pages/review/ReviewList'
import ReviewEdit from "./pages/review/ReviewEdit";
import { Route, Routes } from "react-router-dom";
import MethodologyPreview from "./pages/methodology/MethodologyPreview";
import ResearchPreview from "./pages/research/ResearchPreview";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // refetchOnWindowFocus: false,
//       retry:true,
//       staleTime: 10000,
//     },
//   },
// })
function App() {

  return (
    <Admin
        // queryClient={queryClient}
      dataProvider={dataProvier}
      authProvider={authProvider}
      layout={CLayout}
    >
      <Resource
        name="member"
        icon={() =><Icon>groups</Icon>}
        options={{ label: "Member" }}
        list={MemberList}
        edit={MemberEdit}
        create={MemberCreate}
      />

      <Resource
        name="research"
        options={{ label: "Research" }}
        // icon={() => <i className="anchor icon large"></i>}
        icon={() =><Icon>anchor</Icon>}
        list={ResearchList}
        edit={ResearchEdit}
        create={ResearchCreate}
        show={ResearchPreview}
      />

      {/* // Activity */}
      <Resource
        name="activity"
        options={{ label: "Activity" }}
        // icon={() => <i className="newspaper icon large"></i>}
        // icon={() =><Icon>breaking_news_alt_1</Icon>}
        icon={() =><Icon>newspaper</Icon>}
        list={ActivityList}
        edit={ActivityEdit}
        create={ActivityCreate}
      />

      <Resource
        name="scholar"
        // icon={() => <i className="graduation cap icon large"></i>}
        icon={() =><Icon>school</Icon>}
        options={{ label: "Scholar" }}
        list={ScholarList}
        edit={ScholarEdit}
        create={ScholarCreate}
      />

      <Resource
        name="user"
        // icon={() => <i className="graduation cap icon large"></i>}
        icon={() =><Icon>manage_accounts</Icon>}
        options={{ label: "Users" }}
        list={UserList}
        create={UserCreate}
      />

      <Resource
        name="roles"
        options={{ label: "Roles" }}
        icon={() =><Icon>badge</Icon>}
        list={RoleList}
        edit={ResearchEdit}
        create={ResearchCreate}
      />

      <Resource
        name="permission"
        icon={() =><Icon>key</Icon>}
        options={{ label: "Permission" }}
        list={PermissionList}
        create={PermissionCreate}
      />

      <Resource
        name="banner"
        options={{ label: "Banner" }}
        icon={() =><Icon>photo_library</Icon>}
        list={BannerList}
        edit={BannerEdit}
        create={BannerCreate}
      >
      </Resource>
      <Resource
        name="methodology"
        icon={() =><Icon>map</Icon>}
        options={{ label: "Methodology" }}
        list={MethodologyList}
        edit={MethodologyEdit}
        create={MethodologyCreate}
        show={MethodologyPreview}
      >
      </Resource>

      <Resource
        name="course"
        options={{ label: "Course" }}
        icon={()=><Icon>play_lesson</Icon>}
        list={MethodologyList}
        edit={MethodologyEdit}
      >
      </Resource>
      <Resource
        name="review"
        options={{ label: "Review" }}
        icon={()=><Icon>play_lesson</Icon>}
        list={ReviewList}
        edit={ReviewEdit}
      >
        {/* <ReviewList/> */}
        {/* <Route path="/review"  element={<ReviewList />}/> */}
      </Resource>

      {/* <CustomRoutes>
        <Routes>

        </Routes>
      </CustomRoutes> */}
    </Admin>
  );
}

export default App;
