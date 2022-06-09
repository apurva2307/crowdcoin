// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;
    function createCampaign(uint minimum, string memory desc) public {
        address newCampaign = address(new Campaign(minimum, desc, msg.sender));
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint votingCount;
        mapping (address => bool) vote;
    }
    address public manager;
    Request[] public requests;
    uint public minimumContribution;
    string public description;
    uint public approversCount;
    mapping(address => bool) public approvers;
    mapping(address => bool) public contributed;

    constructor(uint minimum, string memory desc, address creator) {
        manager = creator;
        minimumContribution = minimum;
        description = desc;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        if (!contributed[msg.sender]) {
            contributed[msg.sender] = true;
            approversCount++;
        }
    }

    function createRequest(string memory desc, uint value, address payable rcpnt) public payable restricted{
        Request storage request = requests.push();
        request.description = desc;
        request.value = value;
        request.recipient = rcpnt;
        request.complete = false;
        request.votingCount = 0;
    }

    function approveRequest(uint index) public onlyApprover {
        Request storage request = requests[index];
        require(!request.vote[msg.sender]);
        require(!request.complete);
        request.vote[msg.sender] = true;
        request.votingCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.votingCount > approversCount/2);
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (string memory, uint, uint, uint, uint, address) {
        return (
            description,
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier onlyApprover() {
        require(approvers[msg.sender]);
        _;
    }

}
