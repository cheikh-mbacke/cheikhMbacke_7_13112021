import DisplayLoadingContent from '../../displayLoadingContent/DisplayLoadingContent';
import LoadMainContent from '../../loadContents/LoadMainContent'

export default function Home(props) {
    return (

        <DisplayLoadingContent loadingContent={< LoadMainContent />}>
            {props.idUser === undefined ?
                <>

                    
                    <h3>Oups, vous n'êtes pas connecté !</h3>
                </>
                :
                <>
                    
                    <h1>Home</h1>
                    <p>{props.idUser}</p>
                    <p>{props.token}</p>
                </>
            }
        </DisplayLoadingContent>
    )
}
