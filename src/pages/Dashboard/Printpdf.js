import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import '../../templates/main.css';

const Printpdf = (props) => {
    const data = props.location.state.data;

    const componentRef = useRef();

    const Items = () =>
        data.map((item, key) => {
            let content = props.location.state.content;
            Object.keys(item).map((objKey, index) => {
                content = content.replaceAll(`&lt;${objKey}&gt;`, data[key][objKey])
            })
            return (
                <div className="container" key={key}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <div id="noPrint"><hr /></div>
                </div>
            );
        });


    return (
        <>
            <div className="ref">
                <div ref={componentRef}>
                    <Items />
                </div>
            </div>
            <Button component={Link} to="/dashboard" variant='text'>{'<< '}return</Button>
            <ReactToPrint
                content={() => componentRef.current}
                trigger={() => <button className="btn btn-primary" style={{ marginTop: 20, marginBottom: 20 }}>Print to PDF!</button>}
            />
        </>
    );
}

export default Printpdf;