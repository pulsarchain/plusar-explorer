import request from "@/utils/request";
const backBaseUrl = process.env.backBaseUrl;
// plusar 相关接口
const plusarApi = {
  blocks: "/blocks",
  transactions: "/transactions",
  transactionsExport: "/transactions/export",
  overview: "/overview",
  search: "/search",
  ranking: "/api/scan/rank",
  getPercent: "/api/scan/percent"
};

export async function getBlocks(params) {
  return request.get(plusarApi.blocks, { params });
}
export async function getTransactions(params) {
  return request.get(plusarApi.transactions, { params });
}
export async function getOverview() {
  return request.get(plusarApi.overview);
}
export async function getSearch(params) {
  return request.get(plusarApi.search, { params });
}
export async function getRanking(params) {
  params.size = params.pageSize;
  delete params.pageSize;
  return request.get(backBaseUrl + plusarApi.ranking, { params });
}
export async function getPercent() {
  return request.get(backBaseUrl + plusarApi.getPercent);
}
