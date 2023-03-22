import React from 'react';
import Menu from './components/menu';
import classes from './result.css';

class ResultPage extends React.Component {
    render(){
        return(
            <div className='container'>
                <Menu />
                <div className='main'>
                    <div id='resultBox'>
                        <div className='grade two'>
                            5
                        </div>
                        <p>83%</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultPage;