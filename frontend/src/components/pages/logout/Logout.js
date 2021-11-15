import DisplayLoadingContent from '../../displayLoadingContent/DisplayLoadingContent';
import LoadMainContent from '../../loadContents/LoadMainContent'

export default function Logout() {
    return (
         <DisplayLoadingContent loadingContent={< LoadMainContent/>}>
             <h1>Logout</h1>
         </DisplayLoadingContent>
    )
}