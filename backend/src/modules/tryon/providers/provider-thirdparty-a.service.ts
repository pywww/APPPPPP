import { Injectable } from '@nestjs/common'
import { ProviderSubmitInput, ProviderSubmitResult, TryOnProvider } from './tryon-provider.interface'

@Injectable()
export class ThirdPartyTryOnProviderService implements TryOnProvider {
  readonly name = 'thirdparty-a'

  async submitAndWait(input: ProviderSubmitInput): Promise<ProviderSubmitResult> {
    // 模拟第三方耗时任务。生产环境替换为真实 SDK/HTTP 调用。
    await new Promise((resolve) => setTimeout(resolve, 2200))
    // 仅在显式调试标记下触发失败，避免正常图片字符串被误判。
    if (input.garmentImageUrl.startsWith('debug-fail://')) {
      throw new Error('第三方试穿引擎返回失败')
    }
    return {
      providerTaskId: `tp_${Date.now()}`,
      resultImageUrl: input.garmentImageUrl,
    }
  }
}
