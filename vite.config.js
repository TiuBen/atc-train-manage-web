import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // 需要安装 @types/node
import { env } from "process";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {

    return {
        plugins: [react()],
        server: {
            port: 5173,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"), // 默认的 @ 别名
                "@sn": path.resolve(__dirname, "snComponents"),
                "@utils": path.resolve(__dirname, "src/utils/"), // 新增的别名
            },
        },
        define: {
          'import.meta.env.VITE_SERVE_URL': JSON.stringify(env.VITE_SERVER_URL),
        },
        esbuild: {
            include: /\.[jt]sx?$/,
            exclude: [],
            loader: "jsx",
        },
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js':'jsx',
                },  
            },
        },
    };
});
