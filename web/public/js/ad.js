
window.ethereum.enable();

const web3 = new Web3(window.ethereum);
const web3_Avax= new Web3("https://api.avax-test.network/ext/bc/C/rpc"); 
var accountAddress=""
var chain0="Avax";
var chain0Id=43113;
var chain1="Polygon";
var chain1Id=80001;
var ADAddress0 = "0x111b015C545453F64387502Bb9b7B0CC0021D374";
var ADAddress1 = "0xC4D3d08905393487b43C19D540c24C0ab2dC7438";
var chain="bttc";
var chainId=1029;
var payeeAddress = "0xFA97Fbfd62dE543BeCfa31Ad704F500d6826bbFA";
var registerFees= 0;
var registerFees2=0.01;
var withdrawFees= 0;
var userName="";
var bal;
var BN=web3.utils.BN;
ADABI=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newAdmin",
				"type": "address"
			}
		],
		"name": "changeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenSent",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "message",
				"type": "bytes"
			}
		],
		"name": "handleVoyagerMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "payload",
				"type": "bytes"
			},
			{
				"internalType": "bytes[]",
				"name": "",
				"type": "bytes[]"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint16",
				"name": "sourceChain",
				"type": "uint16"
			},
			{
				"internalType": "bytes32",
				"name": "deliveryHash",
				"type": "bytes32"
			}
		],
		"name": "receiveWormholeMessages",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_name",
				"type": "bytes32"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sendMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_registerFees",
				"type": "uint256"
			}
		],
		"name": "setRegisterFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_withdrawalFees",
				"type": "uint256"
			}
		],
		"name": "setwithdrawalFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_wormholeRelayer",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_sender",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_receiver",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transactionSent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "viewFeeBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_userName",
				"type": "bytes32"
			}
		],
		"name": "getMyBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRegisterFees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			}
		],
		"name": "getUserAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			}
		],
		"name": "getUserDetails",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getUserName",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWithdrawalFees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "seenDeliveryVaaHashes",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
/* global BigInt */
window.ethereum.on('accountsChanged', async () => {
    connectWallet();
});


async function connectWallet(){
    try{
        await ethereum.send('eth_requestAccounts')
        //alert("Wallet connected successfully")
        const accounts= await web3.eth.getAccounts()
        accountAddress=accounts[0];
        verifyChainID()
        w=document.getElementById("wallet")
        if(accountAddress!=""){
            w.innerText= accountAddress.slice(0,7)+"...";
            w.onclick=Wsetup;
           var Contract=new web3_Avax.eth.Contract(ADABI,ADAddress0);
		   
           response = await Contract.methods.getUserName(accountAddress).call({'from':`${accounts[0]}`})
           console.log(response)
           if (response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
            
                document.getElementById("req").style.display="none"
                document.getElementById("registration").style.display="block"
           }
           else{
				userName=web3.utils.hexToString(response);
				document.getElementById("req").style.display="none"
				document.getElementById("registration").style.display="none"
				if(window.location.href=="/user/dashboard/"){
					document.getElementById("data").style.display="block"
					document.getElementById("uName").innerText= userName;
					document.getElementById("uName").onclick= copyLink;
					document.getElementById("qrcode").innerHTML="";
					new QRCode(document.getElementById("qrcode"), window.location.origin+"/payment/"+userName);
				}
				
           }
        }
        
        return accounts[0];
    }
    catch (err){
        alert(err.message)
        w=document.getElementById("wallet")
        
        w.innerText= "Login";
        w.onclick=connectWallet;
        return null;
    }
}

function copyLink(){
	navigator.clipboard.writeText(window.location.origin+"/payment/"+userName).then(()=>{

		alert("Direct Payment Link copied")
	});
}
async function loadPayee(){
	var payeeData=document.getElementById('payeeData')
    var payee=document.getElementById('payee').innerText
	var Contract=new web3.eth.Contract(ADABI,ADAddress0);
    response = await Contract.methods.getUserDetails(web3_Avax.utils.stringToHex(payee)).call()
	if(response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
		alert("Wrong Username")
		window.location.href='/dashboard'
	}
    payeeData.innerText= "Paying to "+ web3.utils.hexToString(response)+ " with user name " +payee
}

async function pay(){
	var Contract=new web3_Avax.eth.Contract(ADABI,ADAddress0);
    response = await Contract.methods.getUserDetails(web3_Avax.utils.stringToHex(document.getElementById("payname").value)).call()
	console.log(response)
	if(response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
		alert("Wrong Username")
		return
		//window.location.href='/dashboard'
	}
    window.location=window.location.origin+"/payment/"+document.getElementById("payname").value
    
  }

async function register(){
	var BN=web3.utils.BN;
    var val=document.getElementById('uname').value
	
	activeChain= await web3.eth.getChainId()
	if(activeChain==chain0Id){
		var Contract=new web3.eth.Contract(ADABI,ADAddress0);
		response = await Contract.methods.getUserDetails(web3.utils.fromAscii(val)).call(   )
		if (response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
			var Name=document.getElementById('nn').innerText;
			var email=document.getElementById('em').innerText;
		// response = await Contract.methods.register(accountAddress).call()
			//console.log(Name,email)
			var res=await Contract.methods.register(web3.utils.fromAscii(val),web3.utils.fromAscii(Name)).send({'from':accountAddress,'value':web3.utils.toWei(registerFees).toString()});
			console.log(res)
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "/users/registerApi?hash="+res.transactionHash+"&username="+val+"&name="+Name+"&email="+email+"&walletAddress="+accountAddress, true);
			xhttp.send();
		
			connectWallet();
		}
		else{
			alert("Username Already exists Try something new")
		}
	}
	else{
		var Contract=new web3_Avax.eth.Contract(ADABI,ADAddress0);
		response = await Contract.methods.getUserDetails(web3.utils.fromAscii(val)).call(   )
		if (response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
			var Name=document.getElementById('nn').innerText;
			var email=document.getElementById('em').innerText;
		// response = await Contract.methods.register(accountAddress).call()
			//console.log(Name,email)
			var crossContract=new web3.eth.Contract(ADCrossABI,ADAddress1);
			var res=await crossContract.methods.registerExternal(web3.utils.fromAscii(val),web3.utils.fromAscii(Name)).send({'from':accountAddress,'value':web3.utils.toWei(registerFees2).toString()});
			console.log(res)
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "/users/registerApi?hash="+res.transactionHash+"&username="+val+"&name="+Name+"&email="+email+"&walletAddress="+accountAddress, true);
			xhttp.send();
		
			connectWallet();
		}
		else{
			alert("Username Already exists Try something new")
		}
	}
  
}


async function payAmt(){

	var val=document.getElementById('amt').value
	if(parseFloat(val)<0.01){
		alert("min 0.01 AVAX/Matic has to be sent")
		return
	}
	var BN=web3.utils.BN;
	let activeChain= await web3.eth.getChainId()
	var sender=document.getElementById('uName').innerText
	var payee=document.getElementById('payee').innerText
		
	if(activeChain==chain0Id){
		var Contract=new web3.eth.Contract(ADABI,ADAddress0);
		try{
			response = await Contract.methods.sendMoney(web3.utils.stringToHex(payee),web3.utils.toWei(val).toString()).send({'from':accountAddress,'value': web3.utils.toWei(val).toString()});
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "/users/payApi?hash="+response.transactionHash+"&sender="+sender+"&receiver="+payee+"&amount="+val+"&chain="+activeChain, true);
			xhttp.send();
		
			alert("Money Sent Successfully")
			
			console.log(response)
			//window.location.href="/dashboard"
		}
		catch(err){
			alert(err)
		}
	}
	else{

		const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api"
		
		// calling the pathfinder api using axios
		const getQuote = async (params) => {
			const endpoint = "v2/quote"
			const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`
			let urlParameters = Object.entries(params).map(e => e.join('=')).join('&');

			console.log(quoteUrl)

			try {
				const res = await fetch(quoteUrl+"?"+urlParameters)
				return res.data;
			} catch (e) {
				console.error(`Fetching quote data from pathfinder: ${e}`)
			}    
		}

		const main = async () => {
			const params = {
				'fromTokenAddress': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				'toTokenAddress': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				'amount': '10000000000000000000', // source amount
				'fromTokenChainId': "80001", // Mumbai
				'toTokenChainId': "43113", // Fuji
				'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
			}
			
			const quoteData = await getQuote(params);
			const txResponse = await getTransaction(params, quoteData);
			const tx = await web3.eth.sendSignedTransaction(txResponse.txn.execution)
			try {
				await tx.wait();
				console.log(`Transaction mined successfully: ${tx.hash}`)
			}
			catch (error) {
				console.log(`Transaction failed with error: ${error}`)
			}
		}

		const getTransaction = async (params, quoteData) => {
			const endpoint = "v2/transaction"
			const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`
			
			console.log(txDataUrl)
		
			try {
				const res = await fetch(txDataUrl, { Method:'POST',  Headers: {
					Accept: 'application.json',
					'Content-Type': 'application/json'
				  },Body:JSON.stringify({
					...quoteData,
					fromTokenAddress: params.fromTokenAddress,
					toTokenAddress: params.toTokenAddress,
					slippageTolerance: 0.5,
					senderAddress: "<sender-address>",
					receiverAddress: "<receiver-address>",
					widgetId: params.widgetId
				})})
				return res.data;
			} catch (e) {
				console.error(`Fetching tx data from pathfinder: ${e}`)
			}    
		}


		main()
	}
}

async function WAmt(){
	var BN=web3.utils.BN;
	var val=document.getElementById('Wamt').value
	//var bal=document.getElementById('UBalance').innerText
	if(parseFloat(bal)<(parseFloat(val)+withdrawFees)){
		alert("insufficient Balance")
		return
	}
    var Contract=new web3.eth.Contract(ADABI,ADAddress0);
	try{
    	response = await Contract.methods.withdrawMoney(web3.utils.toWei(val).toString()).send({'from':accountAddress});
		alert("Money Withdrawn Successfully")
		window.location.href="/dashboard"
	}
	catch(err){
console.log(err)
	}
}

async function getBalance(){
	var UBalance=document.getElementById('UBalance')
   
	var Contract=new web3.eth.Contract(ADABI,ADAddress0);
	try{
    response = await Contract.methods.getMyBalance(web3_Avax.utils.stringToHex(userName)).call()
    UBalance.innerText= "Your Balance is "+ web3.utils.fromWei(response) + " AVAX"
	bal=web3.utils.fromWei(response)
	console.log(response);
	}catch(err){console.log(err)}
}

function Wsetup(){
   
    document.getElementById("walletSetup").style.display="block";
    document.getElementById("QR").style.display="none";
    document.getElementById("UName").style.display="none";
    document.getElementById("History").style.display="none";
    }

async function checkWalletConnect(){
    if(accountAddress=="") return false;
	
	var Contract=new web3_Avax.eth.Contract(ADABI,ADAddress0);
	response = await Contract.methods.getUserName(accountAddress).call({'from':accountAddress})
	if (response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
		console.log("false")
		alert("please register a username first")
		window.location.href="/users/dashboard"
	}
	console.log("true")
    return true
}

async function changeChain(){
	let val=document.getElementById("chain").value
	var changed=false;
	if(parseInt(val)==0){try{
        activeChain= await web3.eth.getChainId()
        if (activeChain!=parseInt(chain0Id)){
            changed =await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x'+chain0Id.toString(16) }], // chainId must be in hexadecimal numbers
                    })
                    return(true)
        }
        else {changed= true;}
    }catch(err){return err};
    console.log(changed);
    return changed;

	}
	else if(parseInt(val)==1){
		try{
		activeChain= await web3.eth.getChainId()
        if (activeChain!=parseInt(chain1Id)){
            changed =await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x'+chain1Id.toString(16) }], // chainId must be in hexadecimal numbers
                    })
                    return(true)
        }
        else {changed= true;}
    }catch(err){return err};
    console.log(changed);
    return changed;

	}


}

async function verifyChainID(){
	let val=document.getElementById("chain").value
	var changed=false;


	try{
		activeChain= await web3.eth.getChainId()
		if (activeChain==parseInt(chain1Id)){
			document.getElementById("chain").value="1"	
		}
		
		else if (activeChain==parseInt(chain0Id)){
			document.getElementById("chain").value="0"	
		}

	}catch(err){return err};
	console.log(changed);
	return changed;

}




async function getTrans(){
url=	"https://api-testnet.bttcscan.com/api?module=logs&action=getLogs&address=0x6a98045685eb1C92F1480f8e4803875D0a29574E&topic0=0xc523bcf6216203e46e799244596f69646e16c9a6108c4796bfc941f058accefc"
}

