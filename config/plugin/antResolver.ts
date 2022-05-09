/**
 * 按需引入
 */
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function configAntResolverPlugin() {
  const antResolverPlugin = Components({
    resolvers: [AntDesignVueResolver({
      resolveIcons: true,
    })],
  });
  return antResolverPlugin;
}
