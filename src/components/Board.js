import React, {useCallback, useState} from 'react';
import ReactLoading from "react-loading";
import {useStream} from 'react-fetch-streams';

export const Board = props => {
    const [data, setData] = useState({});

    const onNext = useCallback(async res => {
        const data = await res.json();
        setData(data);
    }, [setData]);
    useStream('http://localhost:8080/stream', {onNext});

    if(data?.cells) {
        return (
            <React.Fragment>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${data?.cells.length}, 10px)`,
                    width: "fit-content",
                    margin: "0 auto",
                }}>
                    {data.cells.map((col, x) =>
                        col.map((rows, y) => (
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: data.cells[x][y] ? "#FFFFFFFF" : "#000000FF",
                                    border: "1px solid #595959",
                                }}
                            />
                        ))
                    )}
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <ReactLoading type={"bars"} color="#fff" />
            </React.Fragment>
        );
    }
};