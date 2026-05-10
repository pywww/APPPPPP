import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Input, List, Picker, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { getGarment, updateGarment } from '@/api/garments'
import './ResultEdit.css'

const categories = ['上衣', '下装', '连衣裙', '外套', '鞋子', '配饰', '其他']

/**
 * 编辑衣物 — 与衣橱详情同源走后端 PATCH，不再写本地 Dexie。
 */
export default function ResultEdit() {
  const [sp] = useSearchParams()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('其他')
  const [color, setColor] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [id, setId] = useState<number | null>(null)

  useEffect(() => {
    const raw = sp.get('id')
    if (!raw) {
      Toast.show({ content: '缺少衣物 ID' })
      nav(-1)
      return
    }
    const n = Number(raw)
    if (!Number.isFinite(n)) {
      Toast.show({ content: '衣物 ID 无效' })
      nav(-1)
      return
    }
    setId(n)
    getGarment(n)
      .then((row) => {
        setName(row.name)
        setCategory(row.category || '其他')
        setColor(row.color || '')
      })
      .catch(() => {
        Toast.show({ content: '未找到衣物' })
        nav(-1)
      })
  }, [nav, sp])

  const save = async () => {
    if (id == null) return
    try {
      await updateGarment(id, {
        name: name.trim() || '未命名',
        category,
        color: color.trim(),
      })
      Toast.show({ content: '保存成功' })
      nav(-1)
    } catch (e) {
      Toast.show({ content: e instanceof Error ? e.message : '保存失败' })
    }
  }

  return (
    <div>
      <AppHeader title="编辑衣物" onBack={() => nav(-1)} />
      <List className="result-edit__list">
        <List.Item extra={<Input value={name} onChange={setName} placeholder="衣物名称" />}>名称</List.Item>
        <List.Item clickable onClick={() => setPickerOpen(true)} extra={category}>
          品类
        </List.Item>
        <List.Item extra={<Input value={color} onChange={setColor} placeholder="如：米色" />}>颜色</List.Item>
      </List>
      <div className="result-edit__actions">
        <Button block color="primary" shape="rounded" onClick={() => void save()}>
          保存
        </Button>
      </div>
      <Picker
        columns={[categories.map((c) => ({ label: c, value: c }))]}
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        value={[category]}
        onConfirm={(v) => {
          const c = v[0]
          if (c != null) setCategory(String(c))
          setPickerOpen(false)
        }}
      />
    </div>
  )
}
