// src/App.tsx
import { AppLayout } from './layouts/AppLayout';
import { CatalogoMazosView } from './features/mazos/components/CatalogoMazosView';

function App() {
  return (
    <AppLayout>
      <CatalogoMazosView />
    </AppLayout>
  );
}

export default App;
