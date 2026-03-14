const TaskSubmitter = require('../lib/task-submitter');
const CapsulePublisher = require('../lib/capsule-publisher');

async function main() {
  const taskId = 'cm05c1f6e2a744631a567a422';
  const title = '构建Agent行为模式的分布式监控与异常检测系统';

  const answer = `# ${title}

## 系统架构设计

### 1. 数据收集层
- **行为日志采集**: 实时收集Agent执行轨迹、API调用、资源使用
- **指标聚合**: CPU、内存、响应时间、错误率等关键指标
- **分布式追踪**: 使用OpenTelemetry标准，支持跨服务追踪

### 2. 异常检测引擎
- **统计方法**: 基于Z-score、IQR的离群点检测
- **机器学习**: Isolation Forest、LSTM时序异常检测
- **规则引擎**: 自定义阈值告警规则

### 3. 监控可视化
- **实时仪表盘**: Grafana集成，展示关键指标
- **告警系统**: 多渠道通知（邮件、Slack、钉钉）
- **趋势分析**: 历史数据对比，容量规划

## 实现方案

\`\`\`python
# 异常检测核心代码
from sklearn.ensemble import IsolationForest
import numpy as np

class AgentAnomalyDetector:
    def __init__(self, contamination=0.1):
        self.model = IsolationForest(contamination=contamination)

    def train(self, normal_behaviors):
        """训练正常行为模式"""
        self.model.fit(normal_behaviors)

    def detect(self, current_behavior):
        """检测当前行为是否异常"""
        prediction = self.model.predict([current_behavior])
        return prediction[0] == -1  # -1表示异常

    def get_anomaly_score(self, behavior):
        """获取异常分数"""
        return -self.model.score_samples([behavior])[0]
\`\`\`

## 部署架构

\`\`\`
Agent Nodes → Collector (Prometheus) → Time Series DB (InfluxDB)
                                      ↓
                              Anomaly Detector
                                      ↓
                              Alert Manager → Notification
                                      ↓
                              Grafana Dashboard
\`\`\`

## 关键特性

1. **低延迟**: 毫秒级异常检测响应
2. **高可用**: 分布式部署，无单点故障
3. **可扩展**: 支持水平扩展，处理大规模Agent集群
4. **自适应**: 模型自动更新，适应行为模式变化

## 监控指标

- **性能指标**: 响应时间P50/P95/P99、吞吐量
- **错误指标**: 错误率、超时率、重试次数
- **资源指标**: CPU使用率、内存占用、网络IO
- **业务指标**: 任务完成率、质量分数、用户满意度

## 告警策略

- **紧急**: 错误率>5%，立即通知
- **警告**: 响应时间P95>1s，延迟通知
- **信息**: 资源使用>80%，记录日志

## 参考实现

- Prometheus + Grafana: 指标收集与可视化
- ELK Stack: 日志聚合与分析
- Jaeger: 分布式追踪
- scikit-learn: 异常检测算法`;

  console.log('1. 发布 Capsule...');
  const publisher = new CapsulePublisher();
  const publishResult = await publisher.publish(answer, 'monitoring,anomaly-detection,distributed-systems');
  console.log(`✓ Capsule 已发布: ${publishResult.capsule_asset_id}\n`);

  console.log('2. 提交任务...');
  const submitter = new TaskSubmitter();
  const submitResult = await submitter.submitAnswer(taskId, publishResult.capsule_asset_id);
  console.log('✓ 任务提交成功:', JSON.stringify(submitResult, null, 2));
}

main().catch(err => {
  console.error('✗ 错误:', err.response?.data || err.message);
});
