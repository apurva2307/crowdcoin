"use strict";
(() => {
var exports = {};
exports.id = 113;
exports.ids = [113];
exports.modules = {

/***/ 3867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _address_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./ethereum/getCampaign.js + 1 modules
var getCampaign = __webpack_require__(6863);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(7156);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(1831);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/ContributeForm.js






const ContributionForm = ({ address , setSuccessMessage  })=>{
    const { 0: loading , 1: setLoading  } = (0,external_react_.useState)(false);
    const { 0: errorMessage , 1: setErrorMessage  } = (0,external_react_.useState)("");
    const { 0: contributionAmt , 1: setContributionAmt  } = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try {
            const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
            const campaign = (0,getCampaign/* default */.Z)(address);
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3/* default.utils.toWei */.Z.utils.toWei(contributionAmt, "ether")
            });
            setSuccessMessage("You have successfully contributed to this campaign.");
            router.replace(router.asPath);
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                children: "Contribute to this Campaign"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Form, {
                error: !!errorMessage,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Form.Input, {
                        fluid: true,
                        label: "Contribution amount",
                        placeholder: "please enter amount in ether",
                        value: contributionAmt,
                        onChange: (e)=>setContributionAmt(e.target.value)
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Message, {
                        error: true,
                        header: "Oops..",
                        content: errorMessage
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                        primary: true,
                        loading: loading,
                        children: "Contribute"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const ContributeForm = (ContributionForm);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./components/MessageFlash.js
var MessageFlash = __webpack_require__(2958);
;// CONCATENATED MODULE: ./pages/campaigns/[address].js








async function getServerSideProps(context) {
    const { address  } = context.query;
    const campaign = (0,getCampaign/* default */.Z)(address);
    const details = await campaign.methods.getSummary().call();
    const campaignDetails = {
        address: address,
        description: details[0],
        minContribution: details[1],
        balance: details[2],
        requestsCount: details[3],
        approversCount: details[4],
        manager: details[5]
    };
    // Pass data to the page via props
    return {
        props: {
            campaignDetails
        }
    };
}
const Campaign = ({ campaignDetails  })=>{
    const { address , description , minContribution , balance , requestsCount , approversCount , manager ,  } = campaignDetails;
    const { 0: successMessage , 1: setSuccessMessage  } = (0,external_react_.useState)("");
    const renderCards = ()=>{
        const items = [
            {
                header: manager,
                meta: "Address of Manager of this Campaign",
                description: "The manager created this campaign and can create requests to withdraw money.",
                style: {
                    overflowWrap: "break-word"
                }
            },
            {
                header: minContribution,
                meta: "Minimum Contribution (wei)",
                description: "You must contribute at least this much wi to become an approver."
            },
            {
                header: requestsCount,
                meta: "Total number of requests",
                description: "A request tries to withdraw money from this campaign contract. Requests must be approved by approvers."
            },
            {
                header: approversCount,
                meta: "Total number of approvers",
                description: "Number of people who have already donated to this campaign."
            },
            {
                header: web3/* default.utils.fromWei */.Z.utils.fromWei(balance, "ether"),
                meta: "Campaign balance (ether)",
                description: "The balance is how much money this campaign has left to spend."
            }, 
        ];
        return /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Card.Group, {
            items: items
        });
    };
    if (successMessage) {
        setTimeout(()=>{
            setSuccessMessage("");
        }, 6000);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                children: "Campaign Details"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "camp-address",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("b", {
                        children: "Campaign Address: "
                    }),
                    address
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "camp-about",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("b", {
                        children: "About campaign: "
                    }),
                    description
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {}),
            /*#__PURE__*/ jsx_runtime_.jsx(MessageFlash/* default */.Z, {
                color: "green",
                header: "Success!",
                msg: successMessage
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Grid, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Grid.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                width: 10,
                                children: renderCards()
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                width: 6,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(ContributeForm, {
                                    address: address,
                                    setSuccessMessage: setSuccessMessage
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: {
                                    pathname: "/campaigns/[slug]/requests",
                                    query: {
                                        slug: address
                                    }
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                                        primary: true,
                                        children: "View Requests"
                                    })
                                })
                            })
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const _address_ = (Campaign);


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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,664,152], () => (__webpack_exec__(3867)));
module.exports = __webpack_exports__;

})();