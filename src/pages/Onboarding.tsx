import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { useAppStore } from '@/stores/appStore'
import './Onboarding.css'

const slides = [
  { title: '上传模特', desc: '用一张全身正面照，作为试穿基准。' },
  { title: '试穿新衣', desc: '从相册选衣服图，快速看上身效果。' },
  { title: '衣橱与搭配', desc: '保存单品，在工坊里自由组合。' },
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const nav = useNavigate()
  const [sp] = useSearchParams()
  const finishOnboarding = useAppStore((s) => s.finishOnboarding)

  const go = () => {
    finishOnboarding()
    const r = sp.get('redirect')
    nav(r ? decodeURIComponent(r) : '/home', { replace: true })
  }

  return (
    <div className="onboarding">
      <AppHeader title="新手引导" showBack={false} />
      <div className="onboarding__body">
        <h1 className="onboarding__title">{slides[step].title}</h1>
        <p className="onboarding__desc">{slides[step].desc}</p>
        <div className="onboarding__dots">
          {slides.map((_, i) => (
            <span key={i} className={`dot ${i === step ? 'active' : ''}`} />
          ))}
        </div>
      </div>
      <div className="onboarding__footer">
        <Button block color="primary" size="large" onClick={() => (step < slides.length - 1 ? setStep(step + 1) : go())}>
          {step < slides.length - 1 ? '下一步' : '开始体验'}
        </Button>
        <Button block fill="outline" size="large" className="mt" onClick={go}>
          跳过
        </Button>
      </div>
    </div>
  )
}
