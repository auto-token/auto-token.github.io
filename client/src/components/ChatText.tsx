import Card from 'react-bootstrap/Card';

function ChatText (props:any) {
    const {id,text} = props.chat
    return(
        <>
            {/* <div className="chatText">
             <div>{id}</div>
             <div>{text}</div>
            </div> */}
        <Card border="danger" style={{ width: '18rem' }}>
            <Card.Header>{id}</Card.Header>
            <Card.Body>
            <Card.Text>
                {text}
            </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default ChatText;