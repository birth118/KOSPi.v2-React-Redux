import React from 'react'
import { connect } from 'react-redux'
import krx from "krx-stock-api";

import { client } from '../../apis'
import { BuyOrSell, digitConv } from "../../utils";
import { setAlert } from "../../actions";
import Alert from '../layout/alert'
import { TransactSummary } from './transact-summary'


const Transact = ({ match, setAlert }) => {
  const [checkBox, setCheckBox] = React.useState(true)


  const [formData, setFormData] = React.useState({
    companyName: '',
    companyCode: '',
    price: 0,
    amount: 0,
    buyOrSell: 'BUY',
    per: 0,
    pbr: 0,
    kospi: 0,
    kosdaq: 0,
    comment: '매매사유: 싸니까...'
  })


  const {
    companyName,
    companyCode,
    price,
    amount,
    buyOrSell,
    per,
    pbr,
    kospi,
    kosdaq,
    comment
  } = formData

  const { stockcode } = match.params

  React.useEffect(() => {
    client.get(`/api/stockcode/${stockcode}`)
      .then(({ data }) => {
        console.log(data);


        setFormData({
          ...formData,
          companyName: data.companyName,
          companyCode: data.companyCode,
          price: data.previousPrice,
          per: data.avgPER,
          pbr: data.avgPBR
        })

      }).catch((err) => {
        // console.log(err.response);
        setFormData({
          ...formData,

          companyCode: stockcode,

        })
        setAlert(err.response.data.errors[0].message)
      })
    return () => {
      //  cleanup
    }
  }, [])




  const onFormSubmit = (e) => {
    e.preventDefault()
    //console.log(formData);
    client.post('/api/transact', formData)
      .then(({ data }) => {
        //    console.log(data);
        setAlert('매매 등록')

      })
      .catch((err) => {

        setAlert(err.response.data.errors[0].message)
      })
  }



  const onChange = (e) => {
    // console.log([e.target.name]);
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const onBuyOrSellChange = (e) => {
    // //  console.log(e.target.value);
    // setFormData((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    // console.log(formData.buyOrSell);

    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onCheckBox = (e) => {
    setCheckBox(!checkBox)
    //  console.log(checkBox);
  }

  return (
    <div>

      <div>
        <h3 className="ui dividing header"> Transaction </h3>

        <div className="grid stackable ui">
          <div className="row ui">
            {/* TRANSACTIION form*/}

            <div className="ten wide column">

              <form className="ui form" onSubmit={onFormSubmit}>

                <div className="grouped fields">

                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="buyOrSell" value={BuyOrSell.BUY} tabIndex='0' required autoFocus
                        onChange={(e) => {
                          onBuyOrSellChange(e)
                        }}
                      // onChange={onBuyOrSellChange}
                      />
                      <label>Buy 매수</label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="buyOrSell" value={BuyOrSell.SELL}

                        onChange={onBuyOrSellChange}
                      />
                      <label>Sell 매도</label>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="fields">
                  <div className="field ">
                    <label>종목명</label>
                    <div className={checkBox ? `ui  input disabled` : `ui input`}>
                      <input type="text" name="companyName" value={companyName} onChange={onChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label>종목코드</label>
                    <div className="ui disabled  input">
                      <input type="text" name="companyName" value={companyCode} tabIndex='-1' readOnly />
                    </div>
                  </div>

                  <div className="field">
                    <label>수정</label>
                    <input type="checkbox" name="update" value={checkBox} onClick={onCheckBox} />
                  </div>

                </div>



                <div className="fields">
                  <div className="field">
                    <label>수량 Amount</label>
                    <input type="text" name="amount" placeholder="10" value={amount} onChange={onChange} required />
                  </div>
                  <div className="field">
                    <label>가격 Price</label>
                    <input type="text" name="price" placeholder="12000" value={price} onChange={onChange} required />
                  </div>
                  <div className="field">
                    <label>PER</label>
                    <div className={checkBox ? `ui  input disabled` : `ui input`}>
                      <input type="text" name="per" placeholder="0312345" value={per} onChange={onChange} required />
                    </div>
                  </div>
                  <div className="field">
                    <label>PBR</label>
                    <input type="text" name="pbr" placeholder="0312345" value={pbr} onChange={onChange} required />
                  </div>
                </div>

                <div className="fields">
                  <div className="field">
                    <label>KOSPI</label>
                    <div className={checkBox ? `ui  input disabled` : `ui input`}>
                      <input type="text" name="kospi" placeholder="3200" value={kospi} onChange={onChange} required />
                    </div>
                  </div>

                  <div className="field">
                    <label>KOSDAQ</label>
                    <div className={checkBox ? `ui  input disabled` : `ui input`}>
                      <input type="text" name="kosdaq" placeholder="1000" value={kosdaq} onChange={onChange} required />
                    </div>
                  </div>
                </div>


                <div className="field">
                  <label>매매사유</label>
                  <textarea name="comment" value={comment} rows="2" placeholder="" onChange={onChange} required> 매매사유: 싸니까...</textarea>
                </div>




                <hr />

                <Alert />
                <button className="ui fluid large teal submit button">Submit</button>
              </form>


            </div>

            {/* SUMMARY Table */}
            <div className="six wide column">

              <TransactSummary stockcode={stockcode} />
            </div>
          </div>
        </div>



      </div>

    </div>
  )
}



export default connect(null, { setAlert })(Transact)




/* {
  "holdings": 0,
  "avgBuyingPrice": 0,
  "avgPER": 0,
  "avgPBR": 0,
  "evEbitda": 0,
  "previousPrice": 0,
  "previousDate": "2021-02-02T00:55:28.380Z",
  "currentPrice": 0,
  "intrinsic": 0,
  "currency": "KRW",
  "market": "KOSPI",
  "_id": "6018a323ff8fda4c8e7ae08c",
  "userId": "6017559653a7672a98162a5f",
  "companyName": "SK텔레콤",
  "companyCode": "012345",
  "wics": "전기전자",
  "createdAt": "2021-02-02T00:56:03.796Z",
  "updatedAt": "2021-02-02T00:56:03.796Z",
  "__v": 0
} */