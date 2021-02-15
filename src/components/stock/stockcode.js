import React from 'react'
import { connect } from "react-redux";

import { setAlert } from '../../actions'
import { client } from '../../apis'

import { Currency, Market, wicsTable } from '../../utils'
import Alert from '../layout/alert'



const StockCode = ({ setAlert }) => {

  const [formData, setFormData] = React.useState({
    companyCode: '',
    companyName: '',
    wics: '',
    market: Market.KOSPI,
    currency: Currency.KRW
  })

  // const {
  //   companyCode,
  //   companyName,
  //   wics,
  //   market,
  //   currency
  // } = formData

  const selectWics = wicsTable.map((item, idx) => {
    return (
      <option key={idx} value={item.sector}>{item.sector}</option>
    )

  })

  const onMarketChange = (evt) => {
    console.log('MArket');
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const onCurrencyChange = (evt) => {

    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }
  const onWICSChange = (evt) => {

    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const onChange = (evt) => {

    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }



  const onFormSubmit = async (evt) => {
    evt.preventDefault()
    console.log(formData);
    //setAlert('no wics')
    try {
      await client.post('/api/stockcode', formData)
      setAlert('종목 등록')
    } catch (err) {
      err.response.data.errors.map(error => setAlert(error.message))
    }


  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={onFormSubmit}>
        <h3 className="ui dividing header">종목 등록</h3>

        <div className="fields">
          <div className="field">
            <label>종목 Code</label>
            <input type="text" name="companyCode" placeholder="0312345" onChange={onChange} required />
          </div>
          <div className="field">
            <label>종목명</label>
            <input type="text" name="companyName" placeholder="삼성전자" onChange={onChange} required />
          </div>

          {/* WICS */}
          <div className="field">
            <label>WICS분류</label>
            <select className="ui fluid dropdown" name="wics" onChange={onWICSChange} required>
              <option value="">Choose..</option>
              {selectWics}
            </select>
          </div>
        </div>

        <hr />


        <div className="fields">

          <div className="field">
            {/* MARKET */}
            <div className="grouped fields">
              <label htmlFor="market">상장 마켓</label>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="market" value={Market.KOSPI} required
                    onChange={onMarketChange} />
                  <label>{Market.KOSPI}</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="market" value={Market.KOSDAQ} onChange={onMarketChange} />
                  <label>{Market.KOSDAQ}</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="market" value={Market.US} onChange={onMarketChange} />
                  <label>{Market.US}</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="market" value={Market.CHINA} onChange={onMarketChange} />
                  <label>{Market.CHINA}</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="market" value={Market.OTHER} onChange={onMarketChange} />
                  <label>{Market.OTHER}</label>
                </div>
              </div>



            </div>

          </div>

          <div className="field">
            {/* CURRENCY */}
            <div className="grouped fields">
              <label htmlFor="currency">Currency</label>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="currency" tabIndex="0" required
                    value={Currency.KRW} onChange={onCurrencyChange} />
                  <label>{Currency.KRW}</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="currency" tabIndex="0"
                    value={Currency.USD} onChange={onCurrencyChange} />
                  <label>{Currency.USD}</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="currency" tabIndex="0"
                    value={Currency.CNY} onChange={onCurrencyChange} />
                  <label>{Currency.CNY}</label>
                </div>
              </div>

            </div>

          </div>



        </div>
        <Alert />
        <button className="ui fluid large teal submit button">Submit</button>
      </form>
    </div>
  )
}

export default connect(null, { setAlert })(StockCode)