import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ThirdPartyTryOnProviderService } from '../src/modules/tryon/providers/provider-thirdparty-a.service'

test('third-party provider returns result url', async () => {
  const provider = new ThirdPartyTryOnProviderService()
  const result = await provider.submitAndWait({ garmentImageUrl: 'https://example.com/a.png' })
  assert.equal(result.resultImageUrl, 'https://example.com/a.png')
  assert.ok(result.providerTaskId.startsWith('tp_'))
})

test('third-party provider fails when input includes fail marker', async () => {
  const provider = new ThirdPartyTryOnProviderService()
  await assert.rejects(
    provider.submitAndWait({ garmentImageUrl: 'debug-fail://example.com/fail.png' }),
    /失败/,
  )
})
