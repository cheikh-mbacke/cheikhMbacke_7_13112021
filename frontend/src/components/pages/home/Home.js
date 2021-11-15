import DisplayLoadingContent from '../../displayLoadingContent/DisplayLoadingContent';
import LoadMainContent from '../../loadContents/LoadMainContent'

export default function Home() {
    return (
         <DisplayLoadingContent loadingContent={< LoadMainContent/>}>
             <h1>Home</h1>
         </DisplayLoadingContent>
    )
}
