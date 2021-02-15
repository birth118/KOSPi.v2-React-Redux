import React from 'react'
import { connect } from 'react-redux'

import { client } from '../../apis'

import Alert from "../layout/alert";
import { Currency, Market, wicsTable, digitConv } from '../../utils'
import { setAlert } from '../../actions';


const Update = ({ match, setAlert }) => {

  const { stockcode } = match.params

  const [history, setHistorty] = React.useState([])
  const [checkBox, setCheckBox] = React.useState(true)

  const [formData, setFormData] = React.useState({
    companyName: '',
    companyCode: '',
    wics: '',
    market: '',
    currentPrice: 0,
    intrinsic: 0,
    evEbitda: '',
    comment: '',
    currency: ''
  })

  const { companyName,
    companyCode,
    wics,
    market,
    currentPrice,
    intrinsic,
    evEbitda,
    comment,
    currency } = formData


  React.useEffect(() => {

    client.get(`/api/transact/${stockcode}`)
      .then(({ data }) => {

        setHistorty(data)
        // console.log(history);
      })
      .catch(({ response }) => { console.log(response); })

    return () => {
      // clean up code
    }
  }, [match.params])

  React.useEffect(() => {

    client.get(`/api/stockcode/${stockcode}`)
      .then(({ data }) => {

        setFormData(data)
        console.log(data);
      })
      .catch(({ response }) => { console.log(response); })
    return () => {

    }
  }, [match.params])

  const renderHistory = () => {
    return history.map((transaction, idx) => {
      return (
        <tr key={idx}>
          <td> {new Date(transaction.createdAt).toLocaleDateString('en-US')}</td>
          <td>{transaction.buyOrSell}</td>
          <td>{transaction.price}</td>
          <td>{transaction.amount}</td>
          <td>{digitConv(transaction.profit, 1)}</td>
          <td>{digitConv(transaction.profitPercent, 2)}%</td>
          <td>{transaction.comment.substring(0, 20)}</td>


        </tr>

      )
    })
  }

  const selectWics = wicsTable.map((item, idx) => {
    return (
      <option key={idx} value={item.sector}>{item.sector}</option>
    )

  })

  const selectMarkets = Object.values(Market).map((item, idx) => {
    return (
      <option key={idx} value={item}>{item}</option>
    )
  })

  const selectCerrency = Object.values(Currency).map((item, idx) => {
    return (
      <option key={idx} value={item}>{item}</option>
    )
  })
  // console.log(selectMarkes);

  // wicsTable.map((item, idx) => {
  //   return (
  //     <option key={idx} value={item.sector}>{item.sector}</option>
  //   )

  // })


  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    client.patch(`/api/stockcode/${stockcode}`, formData).then(() => { setAlert('수정 완료') })
      .catch((err) => { setAlert(err.response.data.errors[0].message) })
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onCheckBox = (e) => {
    setCheckBox(!checkBox)
    console.log(checkBox);
  }

  return (
    <div>

      {/* 종목 Update */}
      <h3 className="ui dividing header">
        종목 Update
      </h3>
      <form className="ui form" onSubmit={onFormSubmit}>



        <div className="fields">
          <div className="field ">
            <label>종목명</label>
            <div className="ui disabled input">
              <input type="text" name="companyName" value={companyName} readOnly tabIndex='-1' />
            </div>
          </div>
          <div className="field">
            <label>WICS분류</label>
            <select className={checkBox ? `ui fluid disabled dropdown` : `ui fluid  dropdown`}
              name="wics" value={wics} onChange={onChange} required>

              {selectWics}
            </select>
          </div>
          <div className="field">
            <label>시장</label>
            <select className={checkBox ? `ui fluid disabled dropdown` : `ui fluid  dropdown`}
              name="market" value={market} onChange={onChange} required>

              {selectMarkets}
            </select>
          </div>
          <div className="field">
            <label>Currency</label>
            <select className={checkBox ? `ui fluid disabled dropdown` : `ui fluid  dropdown`}
              name="currency" value={currency} onChange={onChange} required>
              {selectCerrency}
            </select>
          </div>

          <div className="field">
            <label>수정</label>
            <input type="checkbox" name="update" value={checkBox} onClick={onCheckBox} />
          </div>
        </div>

        <div className="fields">

          <div className="field">
            <label>현재 Price</label>
            <input type="text" name="currentPrice" value={currentPrice} onChange={onChange} required />
          </div>

          <div className="field">
            <label>내재가치</label>
            <div className={checkBox ? `ui  input disabled` : `ui input`}>
              <input type="text" name="intrinsic" value={intrinsic} onChange={onChange} />
            </div>
          </div>

          <div className="field">
            <label>내재가치 대비</label>
            <div className={checkBox ? `ui right labeled input disabled` : `ui input right labeled`}>
              <input type="text" name="intrinsicPercent" value={digitConv(currentPrice / intrinsic * 100, 2)} readOnly />
              <div className="ui basic label">
                %
             </div>
            </div>
          </div>
          <div className="field">
            <label>EV/EBITDA</label>
            <div className={checkBox ? `ui  input disabled` : `ui input`}>
              <input type="text" name="evEbitda" value={evEbitda} onChange={onChange} required />
            </div>
          </div>
        </div>



        <div className="field">
          <label>종목 특징</label>
          <textarea name="comment" value={comment} rows="4" placeholder="" onChange={onChange} > 매매사유: 싸니까...</textarea>
        </div>




        <hr />

        <Alert />
        <button className="ui fluid large teal submit button">Submit</button>
      </form>





      {/* TRANSACTION HISTORY */}
      <h3 className="ui dividing header">
        거래 히스토리
      </h3>

      <table className="ui striped  unstackable table">
        <thead>
          <tr>
            <th>거래일</th>
            <th>유형</th>
            <th>가격</th>
            <th>수량</th>
            <th>수익액</th>
            <th>수익률</th>
            <th>커멘트</th>
          </tr>
        </thead>
        <tbody>
          {renderHistory()}

        </tbody>

      </table>

    </div >
  )
}


export default connect(null, { setAlert })(Update)