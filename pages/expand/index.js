import { Table, Row, Col, Button } from "antd";
import { FormattedHTMLMessage } from "react-intl";
import style from "@/assets/connect.less";

const Api = ({ messages }) => {
  let m = messages["api.desc"];
  console.log(m);
  const dataSource = [
    {
      key: "1",
      command: `eth.sendTransaction({
  from:addr1, 
  txType:1， 
  delegateFee：delegatefee 
})`,
      function: `${m[0].function}`,
      description: m[0].explaination,
      example: `> 
eth.sendTransaction({
  from:eth.accounts[0],
  txType:1,
  delegateFee:100000
})
  "0x4fa····"
  `,
      retrunValue: m[0].returnValue
    },
    {
      key: "2",
      command: `eth.sendTransaction({
  from:stakeHolderAddr, 
  to:minerAddr, 
  value: stakeValue, 
  txType:2 
})`,
      function: `${m[1].function}`,
      description: m[1].explaination,
      example: `> 
eth.sendTransaction({
  from:eth.accounts[0],
  to:"0x9d98fd6···",
  value:100,
  txType:2
}) 
"0x076f3fdb····"`,
      retrunValue: m[1].returnValue
    },
    {
      key: "3",
      command: `eth.sendTransaction({
  from:stakeHolderAddr, 
  to:minerAddr, 
  txType:3 
})`,
      function: `${m[2].function}`,
      description: m[2].explaination,
      example: `> 
eth.sendTransaction({
  from:eth.accounts&[0],
  to:"0x9d98fd6e8c4940e796···",
  txType:3
}) 
"0xd6cb9a778····""
        `,
      retrunValue: m[2].returnValue
    },
    {
      key: "4",
      command: `eth
.getAllDelegateMiners()`,
      function: `${m[3].function}`,
      description: m[3].explaination,
      example: `> 
eth.getAllDelegateMiners() { 
  0x089····21f4: { 
    DepositBalance: 1e+24, 
    FeeRatio: 200000 
  }, 
  0x9d9····20b4: { 
    DepositBalance: 0, 
    FeeRatio: 100000 
  }, 
  0xbd6····ad7d: { 
    DepositBalance: 1e+24, 
    FeeRatio: 300000 
  } 
}`,
      retrunValue: m[3].returnValue
    },
    {
      key: "5",
      command: `eth
.getAllStakeHolders(addr)`,
      function: `${m[4].function}`,
      description: m[4].explaination,
      example: `> 
eth.getAllStakeHolders(addr) { 
  0x40b····2e843: { 
    depositBalance: 1e+24, 
    depositBlockNumber: 29408 
  } 
}`,
      retrunValue: m[4].returnValue
    },
    {
      key: "6",
      command: `
eth.
getPowTotalSupply(blockNumber)`,
      function: `${m[5].function}`,
      description: m[5].explaination,
      example: `> 
eth.getPowTotalSupply() 
3.782528e+24`,
      retrunValue: m[5].returnValue
    },
    {
      key: "7",
      command: `
eth.
getBlock(blockNumberOrHash)
`,
      function: `${m[6].function}`,
      description: m[6].explaination,
      example: `> 
eth.getBlock(29552) { 
  difficulty: 1032315, 
  extraData: "0xd983010····6e7578", 
  gasLimit: 4712388, 
  gasLimitPivot: 
  "0x47e7c4", 
  gasUsed: 0, 
  hash: "0x4d41fe4···f99606", 
  logsBloom: "0x0000····000000", 
  miner: "0xf53····91b5a", 
  mixHash: "0x000····0000", 
  nonce: "0x15fb58f4b53f5bbe", 
  number: 29552, 
  parentHash: "0x3e20····7eb51d", 
  posLastCycleSupply: "0x0", 
  posLastMatureCycleSupply: "0x0", 
  posOldMatureSupply: "0x0", 
  posProduction: "0x0", 
  posWeight: 9500, 
  powLastCycleSupply: "0xde0···00", 
  powLastMatureCycleSupply: "0xd····00", 
  powOldMatureSupply: "0xde0b····fffe", 
  powProduction: "0x6f····0000", 
  receiptsRoot: "0x56e····63b421", 
  sha3Uncles: "0x1dcc····49347", 
  size: 593, 
  stateRoot: "0x739····3613b", 
  timestamp: 1558861333, 
  totalDifficulty: 27685508816, 
  transactions: [], 
  transactionsRoot: "0x56e81···3b421", 
  uncles: []
}`,
      retrunValue: m[6].returnValue
    }
  ];

  const columns = [
    {
      title: () => {
        return <FormattedHTMLMessage id="api.command" />;
      },
      dataIndex: "command",
      render(v) {
        return <pre>{v}</pre>;
      }
    },
    {
      title: () => {
        return <FormattedHTMLMessage id="api.function" />;
      },
      dataIndex: "function",
      width: 160
    },
    {
      title: () => {
        return <FormattedHTMLMessage id="api.description" />;
      },
      dataIndex: "description",
      width: 160
    },
    {
      title: () => {
        return <FormattedHTMLMessage id="api.example" />;
      },
      dataIndex: "example",
      render(h) {
        return <pre>{h}</pre>;
      }
    },
    {
      title: () => {
        return <FormattedHTMLMessage id="api.retrunValue" />;
      },
      dataIndex: "retrunValue",
      width: 160
    }
  ];

  return (
    <div className={`${style.api} wallet wallet-no-white`}>
      <div className="title">
        <FormattedHTMLMessage id="api.title" />
      </div>
      <Row className="apiTable">
        <Col lg={3}>
          <Button type="primary">
            <FormattedHTMLMessage id="api.btn" />
          </Button>
        </Col>
        <Col lg={21} xs={24}>
          <Table
            dataSource={dataSource}
            scroll={{ x: "1050px" }}
            bordered
            pagination={{ hideOnSinglePage: true }}
            columns={columns}
          />
        </Col>
      </Row>
    </div>
  );
};

Api.getInitialProps = ({ messages }) => {
  return { seo: { title: messages["api.title"] } };
};
export default Api;
