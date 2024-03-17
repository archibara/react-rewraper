# Motivation
https://www.reddit.com/r/ProgrammerHumor/comments/1bb637f/reactisfine/
<img src="https://preview.redd.it/reactisfine-v0-gyk5uj2o3hnc1.jpeg?auto=webp&s=91257656192cb9202b5832315aa9dc4fdbc6da42" alt="reactIsFine" height="300" width="auto">

Before
```tsx
<Provider store={store}>
  <PersistGate loading={<Loader block size={100} />} persistor={persistor}>
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <div className='app'>
              <App />
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
    <GlobalStyles />
  </PersistGate>
</Provider>
```

Just wrap this hell by Rewraper:
```tsx
<Rewraper>
  <Provider store={store}/>
  <PersistGate loading={<Loader block size={100} />} persistor={persistor}/>
  <ErrorBoundary FallbackComponent={ErrorHandler}/>
  <HelmetProvider/>
  <BrowserRouter/>
  <ThemeProvider theme={theme}/>
  <div className='app'/>
  <App />
</Rewraper>
```
Or combine your components & props:
```tsx
<>
  {rewrapComponents([
    [Provider, {store}],
    [PersistGate, {loading: <Loader block size={100} />, persistor}],
    [ErrorBoundary, {FallbackComponent: ErrorHandler}], 
    [HelmetProvider]
    [BrowserRouter]
    [ThemeProvider, {theme}],
    ['div', {className: 'app'}],
    [App]
  ])}
</>
```

### No more ~~"This branch has conflicts that must be resolved"~~

### 100% TypeScript safety... almost

### Roadmap
- test it on real project
- npm uninstall @archibara/react-rewraper
