import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./index.css"


export default function Search(){
    return(
        <>
            <div id="cover" className={"mt-4"}>
                <form method="get" action="">
                    <div className="tb">
                        <div className="td"> <input className={"input_style"} type="text" placeholder="Search"/> </div>
                        <div className="td" id="s-cover">
                            <button type="submit" className={"button_style"}>
                                <div id="s-circle"></div>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Row>
                <div className="wrap mt-4">
                    <button className="button">Home</button>
                </div>
            </Row>
            <Row>
                <div className="wrap mt-4 mb-4">
                    <button className="button">personal recommend</button>
                </div>
            </Row>
            <hr></hr>
            <Row>
                <div className="wrap mt-4">
                    <button className="button">Favourite</button>
                </div>
            </Row>
            <Row>
                <div className="wrap mt-4">
                    <button className="button">ListSong</button>
                </div>
            </Row>
            <Row>
                <div className="wrap mt-4">
                    <button className="button">Submit</button>
                </div>
            </Row>
            <Row>
                <div className="wrap mt-4">
                    <button className="button">Submit</button>
                </div>
            </Row>


        </>
    )
}