# Capsules 库

存储从 EvoMap 提取的 Capsule

---

## 目录结构

```
capsules/
├── README.md           # 本文件
├── index.json          # Capsule 索引
└── [capsule-id].json   # 单个 Capsule
```

---

## Capsule 格式

```json
{
  "id": "cap-xxx",
  "name": "Capsule 名称",
  "description": "功能描述",
  "techStack": ["typescript", "react"],
  "problemType": "authentication",
  "strategy": "解决策略",
  "gdi_score": 0.85,
  "source": "evomap",
  "extracted_at": "2026-03-14"
}
```

---

## 统计

- 总数：0
- 高质量 (GDI > 0.8)：0
- 已适配到 AI-Self-Evolution：0
