const urlCore = 'http://bigprotech.vn:5021/api/';

async function SignInApi(email, password) {
  var link = urlCore + 'Login?email=' + email + '&password=' + password;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function ListPropertyLV1(UserID) {
  var link = urlCore + 'ListPropertyLv1?user_id=' + UserID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListSmallProperty(UserID) {
  var link = urlCore + 'ListSmallestProperty?user_id=' + UserID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListContract(UserID , PropertyID) {
  var link = urlCore + 'ListContract?user_id=' + UserID+'&property_id='+PropertyID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListAssetsAll(UserID) {
  var link = urlCore + 'ListAsset?user_id=' + UserID+'&property_id=';
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListAssetsfollowID(UserID , PropertyID) {
  var link = urlCore + 'ListAsset?user_id=' + UserID+'&property_id='+PropertyID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListMailInbox(UserID) {
  var link = urlCore + 'ListMailInbox?user_id=' + UserID+'&property_id=';
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListElectricWater(UserID,ID_Property) {
  var link = urlCore + 'ElectricWater?user_id=' + UserID+'&property_id='+ID_Property;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListMailSendbox(UserID) {
  var link = urlCore + 'ListMailSent?user_id=' + UserID+'&property_id=';
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}


async function ListRecipt(UserID) {
  var link = urlCore + 'ListRecipt?user_id=' + UserID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}


async function ListExpenditure(UserID) {
  var link = urlCore + 'ListExpenditure?user_id=' + UserID+'&property_id=';
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}


async function ListTenant(UserID, ID_property) {
  var link = urlCore + 'ListTenant?user_id=' + UserID+'&property_id='+ID_property;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function ListAllTenant(UserID) {
  var link = urlCore + 'ListTenant?user_id=' + UserID+'&property_id=';
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function ListInvoice(UserID, ID_property) {
  var link = urlCore + 'ListInvoice?user_id=' + UserID+'&property_id='+ID_property;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function DetailContract(ContractID) {
  var link = urlCore + 'ContractDetail?contract_id=' + ContractID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function ListService(ContractID) {
  var link = urlCore + 'ListService?contract_id=' + ContractID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function Sendmail(res) {
  var link = urlCore+'SendMail';
  try {
    let res = await fetch(link, {
      method: JSON.stringify(res),
      body:res,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function Statistical(UserID,ID_property) {
  var link = urlCore+'Statistical?user_id='+UserID+'&property_id='+ID_property;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function ListPropertyHaveContract(UserID) {
  var link = urlCore+'ListPropertyHaveContract?user_id='+UserID;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}

async function ListInvoiceDetail(ID_Invoice) {
  var link = urlCore+'InvoicePriceDetail?invoice_id='+ID_Invoice;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}
async function ListCreateInvoice(ID_property,ID_User) {
  var link = urlCore+'CreateInvoice?property_id='+ID_property+'&user_id='+ID_User;
  try {
    let res = await fetch(link, {
      method: 'GET',
    })
    return await res.text();
  } catch (error) {
    alert('Error!!!');
  }
}


export{
  ListElectricWater, ListCreateInvoice, ListInvoiceDetail, ListPropertyHaveContract, Statistical, Sendmail, ListAllTenant, ListService, DetailContract, ListInvoice, ListTenant, ListRecipt, ListExpenditure, SignInApi , ListPropertyLV1, ListSmallProperty, ListContract,ListAssetsAll,ListAssetsfollowID, ListMailInbox,ListMailSendbox
};
