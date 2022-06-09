"use strict";
(() => {
var exports = {};
exports.id = 544;
exports.ids = [544];
exports.modules = {

/***/ 4288:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ requests),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(1831);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/MessageFlash.js
var MessageFlash = __webpack_require__(2958);
// EXTERNAL MODULE: ./ethereum/getCampaign.js + 1 modules
var getCampaign = __webpack_require__(6863);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(7156);
;// CONCATENATED MODULE: ./components/RequestRow.js






const RequestRow = ({ request , address , id , approversCount , setErrorMessage , setSuccessMessage ,  })=>{
    const { Row , Cell  } = external_semantic_ui_react_.Table;
    const router = (0,router_.useRouter)();
    const { 0: loading , 1: setLoading  } = (0,external_react_.useState)(false);
    const { 0: floading , 1: setFloading  } = (0,external_react_.useState)(false);
    const { 0: account , 1: setAccount  } = (0,external_react_.useState)("");
    const approve = async ()=>{
        setLoading(true);
        try {
            const campaign = (0,getCampaign/* default */.Z)(address);
            await campaign.methods.approveRequest(id).send({
                from: account
            });
            router.replace(router.asPath);
            setSuccessMessage("You have successfully approved the request.");
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };
    const finalize = async ()=>{
        setFloading(true);
        try {
            const campaign = (0,getCampaign/* default */.Z)(address);
            await campaign.methods.finalizeRequest(id).send({
                from: account
            });
            router.replace(router.asPath);
            setSuccessMessage("You have successfully finalized the request.");
        } catch (err) {
            setErrorMessage(err.message);
        }
        setFloading(false);
    };
    (0,external_react_.useEffect)(()=>{
        const getAccount = async ()=>{
            const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
            setAccount(accounts[0]);
        };
        getAccount();
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
        disabled: request.complete,
        positive: request.votingCount > approversCount / 2 && !request.complete,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: id
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: request.description
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: web3/* default.utils.fromWei */.Z.utils.fromWei(request.value, "ether")
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: request.recipient
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Cell, {
                children: [
                    request.votingCount,
                    "/",
                    approversCount
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: request.complete ? "" : /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                    loading: loading,
                    color: "green",
                    basic: true,
                    onClick: approve,
                    children: "Approve"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: request.complete ? "" : /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                    loading: floading,
                    color: "teal",
                    basic: true,
                    onClick: finalize,
                    children: "Finalize"
                })
            })
        ]
    });
};
/* harmony default export */ const components_RequestRow = (RequestRow);

;// CONCATENATED MODULE: ./pages/campaigns/[address]/requests.js








async function getServerSideProps(context) {
    const { address  } = context.query;
    const campaign = (0,getCampaign/* default */.Z)(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((element, index)=>{
        return campaign.methods.requests(index).call();
    }));
    // Pass data to the page via props
    return {
        props: {
            address,
            requests: JSON.stringify(requests),
            approversCount
        }
    };
}
const CampaignRequests = ({ address , requests , approversCount  })=>{
    requests = JSON.parse(requests);
    const { Header , Row , HeaderCell , Body  } = external_semantic_ui_react_.Table;
    const { 0: msgFlash , 1: setMsgFlash  } = (0,external_react_.useState)(false);
    const { 0: errorMessage , 1: setErrorMessage  } = (0,external_react_.useState)("");
    const { 0: successMessage , 1: setSuccessMessage  } = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        setMsgFlash(router.query.msgFlash);
        const timer = setTimeout(()=>{
            router.replace(`/campaigns/${address}/requests`, undefined, {
                shallow: true
            });
        }, 5000);
        return ()=>{
            clearTimeout(timer);
        };
    }, [
        router.query.msgFlash
    ]);
    if (errorMessage) {
        setTimeout(()=>{
            setErrorMessage("");
        }, 5000);
    }
    if (successMessage) {
        setTimeout(()=>{
            setSuccessMessage("");
        }, 5000);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                children: " Requests"
            }),
            msgFlash && /*#__PURE__*/ jsx_runtime_.jsx(MessageFlash/* default */.Z, {
                color: "green",
                header: "Success!",
                msg: "Your request created successfully."
            }),
            errorMessage && /*#__PURE__*/ jsx_runtime_.jsx(MessageFlash/* default */.Z, {
                color: "red",
                header: "Oops..",
                msg: errorMessage
            }),
            successMessage && /*#__PURE__*/ jsx_runtime_.jsx(MessageFlash/* default */.Z, {
                color: "green",
                header: "Success!",
                msg: successMessage
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: {
                    pathname: "/campaigns/[slug]/requests/new",
                    query: {
                        slug: address
                    }
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                        floated: "right",
                        primary: true,
                        style: {
                            marginBottom: 15
                        },
                        children: "Create Request"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Table, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Header, {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "ID"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Description"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Amount (ether)"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Recipient"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Arrpoval Count"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Approve"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Finalize"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Body, {
                        children: requests.map((request, index)=>{
                            return /*#__PURE__*/ jsx_runtime_.jsx(components_RequestRow, {
                                request: request,
                                address: address,
                                id: index,
                                approversCount: approversCount,
                                setErrorMessage: setErrorMessage,
                                setSuccessMessage: setSuccessMessage
                            }, index.toString());
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const requests = (CampaignRequests);


/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1831:
/***/ ((module) => {

module.exports = require("semantic-ui-react");

/***/ }),

/***/ 8519:
/***/ ((module) => {

module.exports = require("web3");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,664,152], () => (__webpack_exec__(4288)));
module.exports = __webpack_exports__;

})();