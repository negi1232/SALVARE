// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SALVARE is ERC20 {
    mapping(address => uint256) requester_balances;

    struct Garbage_can {
        address owner;
        address garbage_can;
        string location_address;
        string location_image;
        uint256 lat;
        uint256 lot;
        uint256 amount;
        uint256 max_amount;
        //uint time_ephoc;
        uint256 reward;
    }

    constructor() ERC20("SALVARE_token", "SALVARE") {
        init_garbage_can();
        _mint(address(this),1000*10**18);
    }

    Garbage_can[] garbage_cans;
    mapping(address => uint256) garbage_can_list;

    mapping (address=>uint256) address2work;//uint [gram,reward]

    function init_garbage_can() private {
        //ゴミ箱を登録
        garbage_cans.push(
            Garbage_can(
                address(0x00),
                address(0x00),
                "dummy",
                "https://aaaaa.png",
                0,
                10000,
                0,
                0,
                0
            )
        ); //識別用のダミーを作成

        garbage_cans.push(
            Garbage_can(
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷　ハチ公前",
                "https://aaaaa.png",
                3565834639713606,
                13970303583403240,
                10000,
                20000,
                0
            )
        ); //識別用のダミーを作成

        garbage_cans.push(
            Garbage_can(
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷　ハチ公後ろ",
                "https://aaaaa.png",
                3565876211991804,
                13970375443275780,
                11000,
                20000,
                0
            )
        ); //識別用のダミーを作成

        garbage_cans.push(
            Garbage_can(
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷　ハチ公右",
                "https://aaaaa.png",
                3565836740592249,
                13970355092249920,
                1200,
                20000,
                0
            )
        ); //識別用のダミーを作成

        garbage_cans.push(
            Garbage_can(
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷　ハチ公左",
                "https://aaaaa.png",
                3565889013484929,
                13969978926521935,

                13000,
                20000,
                0
            )
        ); //識別用のダミーを作成

        garbage_cans.push(
            Garbage_can(
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷　ハチ公上",
                "https://aaaaa.png",
                3565774332711117,
                13969982208945464,
                14000,
                20000,
                0
            )
        ); //識別用のダミーを作成

        garbage_cans.push(
            Garbage_can(
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷　ハチ公下",
                "https://aaaaa.png",
                3565798863813731,
                13970174987485640,
                15000,
                20000,
                0
            )
        ); //識別用のダミーを作成garbage_can_list[msg.sender]=1;
    }

    function set_amount_of_trash(uint256 _new_amount) public {
        //ゴミ箱からのトランザクションのみ受け付ける
        //require(garbage_can_list[msg.sender]==0,"you are not garbage can");
        garbage_cans[garbage_can_list[msg.sender]].amount = _new_amount;
    }

    function get_garbage_can(uint256 id)
        public
        view
        returns (Garbage_can memory)
    {
        return garbage_cans[id];
    }

    function verifySignature(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        address signer = ecrecover(prefixedHash, v, r, s);

        return signer;
    }

    function start_work(
        uint256 gram,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        //ゴミ箱からのトランザクションのみ受け付ける
        //署名を検証しワーカーのアドレスを取得
        verifySignature(messageHash, v, r,s ) ;
        //is_workに運んでいる量を記録 mapping (address=>[uint 256,uint 256]) work
        address worker=msg.sender;
        address2work[worker]=gram;
    }

    function done_work(uint gram,uint8 v,bytes32 r, bytes32 s,string memory message) public {
        //集積所からのトランザクションを受け付ける 
        //署名を検証しワーカーのアドレスを取得
        //is_workに運んでいる量と報酬を記録 mapping (address=>[uint 256,uint 256]) work
        //if(gram>=work[0]-1000 ||gram<=work[0]+1000){
            //transfer(address_worker, work[1]);
        //}
    }

    function with_draw(address _target) public {
        //払い出しを希望した場合集積所が行う
    }
}
