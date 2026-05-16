import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  return (
    <div className="flex min-h-dvh w-full">
      <div className="flex w-1/3 shrink-0 flex-col justify-center bg-background px-8">
        <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
          <img
            src="/OmniAge_Logo_4K.svg"
            alt=""
            className="mx-auto w-1/2 object-contain"
          />
          <div className="flex flex-col gap-4">
            <Input placeholder="用户名" aria-label="用户名" />
            <Input type="password" placeholder="密码" aria-label="密码" />
            <Button type="button" className="w-full">
              登录
            </Button>
          </div>
        </div>
      </div>
      <div className="relative min-h-dvh w-2/3 shrink-0">
        <img
          src="/log.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  )
}
