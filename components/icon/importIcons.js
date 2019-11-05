const importAll = requireContext => requireContext.keys().forEach(requireContext);
try {
    importAll(require.context('./svg/', true, /\.svg$/))
} catch (err) {
    // 测试没有 require.context 会报错
    // console.error(err);
}
