const digitConv = (src, digit) => {

  const option1 = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }

  const option2 = {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }

  const option3 = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }

  // const optionsDate = { year: '2-digit', month: '2-digit', day: 'numeric' };

  // const holdings = Number(theHolding.holdings).toLocaleString('en', option1)
  // const avgBuyingPrice = theHolding.currency && theHolding.currency !== 'KRW' ? Number(theHolding.avgBuyingPrice).toLocaleString('en', option3) : Number(theHolding.avgBuyingPrice).toLocaleString('en', option1)

  // const currentPrice = theHolding.currency && theHolding.currency !== 'KRW' ? Number(theHolding.currentPrice).toLocaleString('en', option3) : Number(theHolding.currentPrice).toLocaleString('en', option1)
  // const percent = ((theHolding.currentPrice / theHolding.avgBuyingPrice) - 1) * 100
  // const formattedPercent = Number(percent).toLocaleString('en', option2)
  // const avgPER = Number(theHolding.avgPER).toLocaleString('en', option2)
  // const avgPBR = Number(theHolding.avgPBR).toLocaleString('en', option2)
  // const intrinsic = Number(theHolding.intrinsic).toLocaleString('en', option1)
  // const previousPrice = theHolding.currency && theHolding.currency !== 'KRW' ? Number(theHolding.previousPrice).toLocaleString('en', option3) : Number(theHolding.previousPrice).toLocaleString('en', option1)
  // //const previousPrice = Number(theHolding.previousPrice).toLocaleString('en', option1)
  // const myDate = new Date(theHolding.previousDate)
  // const previousDate = myDate.toLocaleDateString("ko-KR", optionsDate)

  let option = option3
  if (digit === 1) {
    option = option1
  } else if (digit === 2) {
    option = option2
  } else
    option = option3

  return Number(src).toLocaleString('en', option)
}







const Market = {
  KOSPI: 'KOSPI',
  KOSDAQ: 'KOSDAQ',
  US: 'US',
  CHINA: 'CHINA',
  OTHER: 'Others',
}

const Currency = {
  KRW: 'KRW',
  USD: 'USD',
  CNY: 'CNY',
}

const BuyOrSell = {
  BUY: 'BUY',
  SELL: 'SELL',
}




const wicsTable = [
  { code: '101010', sector: '에너지장비및서비스' },
  { code: '101020', sector: '석유와가스' },
  { code: '151010', sector: '화학' },
  { code: '151030', sector: '포장재' },
  { code: '151040', sector: '비철금속' },
  { code: '151050', sector: '철강' },
  { code: '151060', sector: '종이와목재' },
  { code: '201010', sector: '우주항공과국방' },
  { code: '201020', sector: '건축제품' },
  { code: '201025', sector: '건축자재' },
  { code: '201030', sector: '건설' },
  { code: '201035', sector: '가구' },
  { code: '201040', sector: '전기장비' },
  { code: '201050', sector: '복합기업' },
  { code: '201060', sector: '기계' },
  { code: '201065', sector: '조선' },
  { code: '201070', sector: '무역회사와판매업체' },
  { code: '202010', sector: '상업서비스와공급품' },
  { code: '203010', sector: '항공화물운송과물류' },
  { code: '203020', sector: '항공사' },
  { code: '203030', sector: '해운사' },
  { code: '203040', sector: '도로와철도운송' },
  { code: '203050', sector: '운송인프라' },
  { code: '251010', sector: '자동차부품' },
  { code: '251020', sector: '자동차' },
  { code: '252040', sector: '가정용기기와용품' },
  { code: '252050', sector: '레저용장비와제품' },
  { code: '252060', sector: '섬유,의류,신발,호화품' },
  { code: '252065', sector: '화장품' },
  { code: '252070', sector: '문구류' },
  { code: '253010', sector: '호텔,레스토랑,레저' },
  { code: '253020', sector: '다각화된소비자서비스' },
  { code: '255010', sector: '판매업체' },
  { code: '255020', sector: '인터넷과카탈로그소매' },
  { code: '255030', sector: '백화점과일반상점' },
  { code: '255040', sector: '전문소매' },
  { code: '256010', sector: '교육서비스' },
  { code: '301010', sector: '식품과기본식료품소매' },
  { code: '302010', sector: '음료' },
  { code: '302020', sector: '식품' },
  { code: '302030', sector: '담배' },
  { code: '303010', sector: '가정용품' },
  { code: '351010', sector: '건강관리장비와용품' },
  { code: '351020', sector: '건강관리업체및서비스' },
  { code: '351030', sector: '건강관리기술' },
  { code: '352010', sector: '생물공학' },
  { code: '352020', sector: '제약' },
  { code: '352030', sector: '생명과학도구및서비스' },
  { code: '401010', sector: '은행' },
  { code: '402010', sector: '증권' },
  { code: '403020', sector: '창업투자' },
  { code: '403030', sector: '카드' },
  { code: '403040', sector: '기타금융' },
  { code: '404010', sector: '손해보험' },
  { code: '404020', sector: '생명보험' },
  { code: '405020', sector: '부동산' },
  { code: '451020', sector: 'IT서비스' },
  { code: '451030', sector: '소프트웨어' },
  { code: '452010', sector: '통신장비' },
  { code: '452015', sector: '핸드셋' },
  { code: '452020', sector: '컴퓨터와주변기기' },
  { code: '452030', sector: '전자장비와기기' },
  { code: '452040', sector: '사무용전자제품' },
  { code: '453010', sector: '반도체와반도체장비' },
  { code: '453510', sector: '전자제품' },
  { code: '453520', sector: '전기제품' },
  { code: '454010', sector: '디스플레이패널' },
  { code: '454020', sector: '디스플레이장비및부품' },
  { code: '501010', sector: '다각화된통신서비스' },
  { code: '501020', sector: '무선통신서비스' },
  { code: '502010', sector: '광고' },
  { code: '502020', sector: '방송과엔터테인먼트' },
  { code: '502030', sector: '출판' },
  { code: '502040', sector: '게임엔터테인먼트' },
  { code: '502050', sector: '양방향미디어와서비스' },
  { code: '551010', sector: '전기유틸리티' },
  { code: '551020', sector: '가스유틸리티' },
  { code: '551030', sector: '복합유틸리티' },
  { code: '551040', sector: '수도유틸리티' },
  { code: '551050', sector: '독립전력생산및에너지거래' },
]


export {
  Market, Currency, BuyOrSell, wicsTable, digitConv
}