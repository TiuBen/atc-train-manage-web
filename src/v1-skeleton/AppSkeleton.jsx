import Skeleton from "./src/skeleton";
import './AppSkeleton.css'

function AppSkeleton() {
    return (
            <Skeleton
                topNav={<div>Top Navigation</div>}
                leftSidebar={<div>Left </div>}
                rightSidebar={<div>Right Sidebar</div>}
                bottomBar={<div>Bottom Bar</div>}
                floatingAction={<span>+</span>}
            />
    );
}

export default AppSkeleton;
