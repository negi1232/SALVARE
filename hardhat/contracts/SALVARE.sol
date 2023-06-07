// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SALVARE is ERC20 {
    struct TrashCan {
        uint256 id;
        address trashCanOwner;
        address trashCan;
        string trashCanLocationAddress;
        string trashCanLocationImage;
        uint256 trashCanLatitude;
        uint256 trashCanLongitude;
        uint256 trashCanAmount;
        uint256 trashCanMaxAmount;
        uint256 trashCanReward;
        RecyclingCenter recyclingCenter;
    }

    struct Work {
        uint256 id;
        uint256 gram;
    }

    struct RecyclingCenter {
        uint256 id;
        string recyclingCenterName;
        string recyclingCenterLocationAddress;
        uint256 recyclingCenterLatitude;
        uint256 recyclingCenterLongitude;
    }

    event StartWork(address indexed worker, uint256 indexed id);
    event DoneWork(address indexed worker, uint256 indexed id);
    event Balance(address indexed worker, uint256 balance);

    constructor() ERC20("SALVAREToken", "SALVARE") {
        _initTrashCan();
        _mint(address(this), 1000000 * 10 ** 18);
    }

    TrashCan[] trashCans;
    mapping(address => Work) public workerToWork;

    function _initTrashCan() private {
        //ゴミ箱を登録
        trashCans.push(
            TrashCan(
                0,
                address(0x00),
                address(0x00),
                "",
                "",
                0,
                0,
                0,
                0,
                0,
                RecyclingCenter(0, "", "", 0, 0)
            )
        ); //識別用のダミーを作成

        trashCans.push(
            TrashCan(
                1,
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"渋谷 ハチ公前",
                "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png",
                3565834639713606,
                13970303583403240,
                10000,
                20000,
                0,
                RecyclingCenter(
                    0,
                    unicode"渋谷清掃工場",
                    unicode"〒150-0011 東京都渋谷区東１丁目３５−１",
                    3565346025058248,
                    13970648889528675
                )
            )
        ); //識別用のダミーを作成

        trashCans.push(
            TrashCan(
                2,
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"Shibuya-ku Address 2",
                "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png",
                3565876211991804,
                13970375443275780,
                11000,
                20000,
                0,
                RecyclingCenter(
                    0,
                    unicode"渋谷清掃工場",
                    unicode"〒150-0011 東京都渋谷区東１丁目３５−１",
                    3565346025058248,
                    13970648889528675
                )
            )
        ); //識別用のダミーを作成

        trashCans.push(
            TrashCan(
                3,
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"Shibuya-ku Address 3",
                "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png",
                3565836740592249,
                13970355092249920,
                1200,
                20000,
                0,
                RecyclingCenter(
                    0,
                    unicode"渋谷清掃工場",
                    unicode"〒150-0011 東京都渋谷区東１丁目３５−１",
                    3565346025058248,
                    13970648889528675
                )
            )
        ); //識別用のダミーを作成

        trashCans.push(
            TrashCan(
                4,
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"Shibuya-ku Address 4",
                "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png",
                3565889013484929,
                13969978926521935,
                13000,
                20000,
                0,
                RecyclingCenter(
                    0,
                    unicode"渋谷清掃工場",
                    unicode"〒150-0011 東京都渋谷区東１丁目３５−１",
                    3565346025058248,
                    13970648889528675
                )
            )
        ); //識別用のダミーを作成

        trashCans.push(
            TrashCan(
                5,
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"Shibuya-ku Address 5",
                "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png",
                3565774332711117,
                13969982208945464,
                14000,
                20000,
                0,
                RecyclingCenter(
                    0,
                    unicode"渋谷清掃工場",
                    unicode"〒150-0011 東京都渋谷区東１丁目３５−１",
                    3565346025058248,
                    13970648889528675
                )
            )
        ); //識別用のダミーを作成

        trashCans.push(
            TrashCan(
                6,
                address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4),
                address(0x00),
                unicode"Shibuya-ku Address 6",
                "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png",
                3565798863813731,
                13970174987485640,
                15000,
                20000,
                0,
                RecyclingCenter(
                    0,
                    unicode"渋谷清掃工場",
                    unicode"〒150-0011 東京都渋谷区東１丁目３５−１",
                    3565346025058248,
                    13970648889528675
                )
            )
        ); //識別用のダミーを作成trashCanList[msg.sender]=1;
    }

    function isWorking(address worker) public view returns (Work memory) {
        return workerToWork[worker];
    }

    function setAmountOfTrash(uint256 _newAmount, uint256 id) public {
        //ゴミ箱からのトランザクションのみ受け付ける
        //require(workerToWork[msg.sender]==0,"you are not trash can");
        trashCans[id].trashCanAmount = _newAmount;
    }

    function getTrashCans() public view returns (TrashCan[] memory) {
        return trashCans;
    }

    function getWork(address target) public view returns (Work memory) {
        return workerToWork[target];
    }

    function verifySignature(
        bytes32 messageHash,
        bytes memory signature
    ) public pure returns (address) {
        return
            ECDSA.recover(ECDSA.toEthSignedMessageHash(messageHash), signature);
    }

    function startWork(
        uint256 trashWeight,
        bytes32 messageHash,
        bytes memory signature,
        uint256 id
    ) public {
        //ゴミ箱からのトランザクションのみ受け付ける
        //署名を検証しワーカーのアドレスを取得
        //is_workに運んでいる量を記録 mapping (address=>[uint 256,uint 256]) work
        address worker = verifySignature(messageHash, signature);
        // trashWeight != 0 -> isWorking
        workerToWork[worker].gram = trashWeight;
        workerToWork[worker].id = id;

        trashCans[id].trashCanAmount -= trashWeight;
        emit StartWork(worker, id);
    }

    function doneWork(
        uint actualWeight,
        bytes32 messageHash,
        bytes memory signature
    ) public {
        //集積所からのトランザクションを受け付ける
        //署名を検証しワーカーのアドレスを取得
        address worker = verifySignature(messageHash, signature);
        //is_workに運んでいる量と報酬を記録 mapping (address=>[uint 256,uint 256]) work
        uint256 trashWeight = workerToWork[worker].gram;
        //actualWeight is weight of trash on Recycle center 500g
        //trashWeight is weight of trash brought by Worker 1000g
        emit DoneWork(worker, workerToWork[worker].id);
        emit Balance(worker, balanceOf(worker)+actualWeight * 10 ** 18);
        workerToWork[worker].gram = 0;
        workerToWork[worker].id = 0;

        if (trashWeight - trashWeight / 10 < actualWeight) {
            _transfer(address(this), worker, actualWeight * 10 ** 18);
        }
    }
}
