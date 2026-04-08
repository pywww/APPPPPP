import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const inputArg = process.argv[2] || 'figma-mcp/fidelity-checklist.json'
const inputPath = path.resolve(process.cwd(), inputArg)

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw)
}

function clampScore(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return value
}

function computePageScore(page, weights) {
  const scores = page.scores ?? {}
  let total = 0

  for (const [key, weight] of Object.entries(weights)) {
    const normalized = clampScore(scores[key])
    total += (normalized * weight) / 100
  }

  return Number(total.toFixed(2))
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`未找到验收文件: ${inputPath}`)
  }

  const payload = readJson(inputPath)
  const pages = Array.isArray(payload.pages) ? payload.pages : []
  const weights = payload.weights ?? {}
  const threshold = typeof payload.threshold === 'number' ? payload.threshold : 95

  if (pages.length === 0) {
    console.log('未配置页面评分项，无法计算。')
    return
  }

  const result = pages.map((page) => {
    const pageScore = computePageScore(page, weights)
    const passed = pageScore >= threshold
    return {
      route: page.route,
      figmaNodeId: page.figmaNodeId,
      score: pageScore,
      passed,
      notes: page.notes ?? '',
    }
  })

  const avg = Number((result.reduce((sum, item) => sum + item.score, 0) / result.length).toFixed(2))
  const passCount = result.filter((item) => item.passed).length

  console.log('=== Figma 相似度验收报告 ===')
  console.log(`项目: ${payload.project ?? 'unknown'}`)
  console.log(`通过线: ${threshold}`)
  console.log(`页面通过: ${passCount}/${result.length}`)
  console.log(`平均得分: ${avg}`)
  console.log('')
  result.forEach((item) => {
    console.log(`${item.passed ? 'PASS' : 'FAIL'} ${item.route} (${item.figmaNodeId}) -> ${item.score}`)
    if (item.notes) {
      console.log(`  备注: ${item.notes}`)
    }
  })
}

main()
