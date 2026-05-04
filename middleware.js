import { next } from "@vercel/edge";

export const config = {
    // すべてのページと画像などのファイルにBasic認証を適用
    matcher: "/(.*)",
};

export default function middleware(request) {
    const authorizationHeader = request.headers.get("authorization");

    // Vercelの環境変数からIDとパスワードを取得（設定がない場合は admin / yuden2024 になる）
    const user = process.env.BASIC_AUTH_USER || "yuden";
    const pwd = process.env.BASIC_AUTH_PASSWORD || "esse841";

    if (authorizationHeader) {
        const basicAuth = authorizationHeader.split(" ")[1];
        const [providedUser, providedPwd] = atob(basicAuth).split(":");

        // IDとパスワードが一致したらページを表示
        if (providedUser === user && providedPwd === pwd) {
            return next();
        }
    }

    // 認証失敗時：ログインダイアログを出す
    return new Response("Basic Auth required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
    });
}
