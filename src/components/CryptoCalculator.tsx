import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoCalculator = () => {
  const exchangeRate = 7.25; // CNY/USD
  const currentBtcPrice = 67000;
  const currentTotalValue = 220000;
  const btcPercentage = 0.95;
  const currentBtcValue = currentTotalValue * btcPercentage;
  const currentBtcAmount = currentBtcValue / currentBtcPrice;
  const otherValue = currentTotalValue * (1 - btcPercentage);

  const targetPrices = [67000, 120000, 150000, 180000, 200000, 250000, 300000];
  const data = targetPrices.map(price => {
    const newBtcValue = currentBtcAmount * price;
    const totalValueUSD = newBtcValue + otherValue;
    const totalValueCNY = totalValueUSD * exchangeRate;
    return {
      btcPrice: price,
      totalValueUSD: Math.round(totalValueUSD),
      totalValueCNY: Math.round(totalValueCNY),
      formattedUSD: `$${(totalValueUSD / 1000).toFixed(1)}K`,
      formattedCNY: `¥${(totalValueCNY / 10000).toFixed(1)}万`
    };
  });

  return (
    <div className="w-full max-w-4xl">
      <div>
        <div>加密货币资产价值预测（美元/人民币）</div>
      </div>
      <div>
        <div className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="btcPrice"
                  tickFormatter={(value) => `$${value / 1000}K`}
                  label={{ value: '比特币价格(USD)', position: 'bottom', offset: 0 }}
                />
                <YAxis
                  yAxisId="usd"
                  orientation="left"
                  tickFormatter={(value) => `$${value / 1000}K`}
                  label={{ value: '总资产(USD)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="cny"
                  orientation="right"
                  tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                  label={{ value: '总资产(CNY)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "totalValueUSD") return [`$${(value / 1000).toFixed(1)}K`, '总资产(USD)'];
                    return [`¥${(value / 10000).toFixed(1)}万`, '总资产(CNY)'];
                  }}
                  labelFormatter={(value) => `比特币价格: $${value / 1000}K`}
                />
                <Line yAxisId="usd" type="monotone" dataKey="totalValueUSD" stroke="#8884d8" width={2} name="totalValueUSD" />
                <Line yAxisId="cny" type="monotone" dataKey="totalValueCNY" stroke="#82ca9d" width={2} name="totalValueCNY" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div key={item.btcPrice} className="p-4 bg-gray-100 rounded-lg">
                <div className="text-sm text-gray-600">当BTC价格为:</div>
                <div className="font-bold">${(item.btcPrice / 1000).toFixed(1)}K</div>
                <div className="text-sm text-gray-600">总资产价值:</div>
                <div className="font-bold text-blue-600">{item.formattedUSD}</div>
                <div className="font-bold text-green-600">{item.formattedCNY}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;