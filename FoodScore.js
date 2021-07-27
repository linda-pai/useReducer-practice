import React, { useState, useEffect, useReducer } from 'react';
import './Expert.scss';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { pad, clickLogout } from '../../utils/Functions';
import greenMan from "../../images1/greenMan/greenMan.png";
import greenFood from '../../images1/common/greenFood.png';


function init(initialData) {
    return initialData
}

function reducer(state, action) {
    switch (action.type) {
        case 'SELECT':
            return ({ ...state, ...action.payload });
        case 'RESET':
            return init(action.payload);
        case 'DEFAULT':
            return init(action.payload);
        default:
            throw new Error()
    }
}

function FoodScore(props, initialData) {

    const [state, dispatch] = useReducer(reducer, initialData, init)

    const submit = () => {
        setShowDialog(true)
        setAlertTitle("提交中~")
        fetch(`${props.SSL}//${props.domain}/api/api/Expert/Score/Edit`, {
            method: 'POST',
            body: serialize({
                Item01: String(state.item01),
                Item02: String(state.item02),
                Item03: String(state.item03),
                Item04: String(state.item04),
                Item05: String(state.item05),
                Item06: String(state.item06),
                Item07: String(state.item07),
                Item08: String(state.item08),
                Item09: String(state.item09),
                Item10: String(state.item10),
                Item11: String(state.item11),
                Item12: String(state.item12),
                Item13: String(state.item13),
                Item14: String(state.item14),
                Item15: String(state.item15),
                Item16: String(state.item16),
                ThemeId: themeId,
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setShowDialog(true)
                    setAlertTitle("成功提交！")
                    history.go(0);
                }
            })
    }


    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/Expert/Score`, {
            method: 'POST',
            body: serialize({
                ThemeId: themeId
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess)
                    dispatch({ type: "DEFAULT", payload: result.resultObject })
            })

    }, [themeId])


    const TableData = (
        <>
            {titleData.map((data, index) => {
                const { order, item, desc } = data
                return (
                    <tr className="" key={index}>
                        <td data-title="標題" className="">
                            <div className="score-title-wrapper">
                                <h4 className="title-number">{pad(order)}</h4>
                                <div className="score-text-wrapper">
                                    <h4>{item}</h4>
                                    <h6>{desc}</h6>
                                </div>
                            </div>
                        </td>
                        <td data-title="總是做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 5 && <img className="score-select-img" src={greenMan} alt="已選擇" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 5 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="經常做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 4 && <img className="score-select-img" src={greenMan} alt="已選擇" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 4 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="偶爾做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 3 && <img className="score-select-img" src={greenMan} alt="已選擇" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 3 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="打算做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 2 && <img className="score-select-img" src={greenMan} alt="已選擇" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 2 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="不適用">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 1 && <img className="score-select-img" src={greenMan} alt="已選擇" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 1 } })}>選擇</button>
                            }
                        </td>
                    </tr>
                )
            })}
        </>
    )


    return (
        <>
            <img alt="綠色飲食-橫幅" title="綠色飲食-橫幅" className="w-100" src="../../../images/flip/food/topBanner.jpg" />
            <div className="container containerBox flip-tour">
                <div className="">
                    <table className="expertPoint-table">
                        <thead className="expertPoint-table-head">
                            <tr>
                                <th></th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">總是</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">經常</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">偶爾</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">打算</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text width-zero">&nbsp;</h4>
                                        <h5>不適用</h5>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="expertPoint-table-body">
                            {TableData}
                        </tbody>
                    </table>
                    <div className="score-btn-wrapper">
                        <button onClick={submit} className="send-btn">送出成果</button>
                        <button onClick={() => dispatch({ type: "RESET", payload: initialData })} className="cancel-btn">重新評量</button>
                    </div>
                </div>

        </>
    );
}

export default withRouter(FoodScore);
