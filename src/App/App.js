import { Switch, Route } from "react-router-dom";
import { Meme } from "../Meme/Meme";
import { MemeGenerated } from "../MemeGenerated/MemeGenerated";
import { ShowMemes } from "../YourMemes/ShowMemes";
import "../bg.jpg";
export const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Meme />
      </Route>
      <Route path="/generated">
        <MemeGenerated />
      </Route>
      <Route path="/generated-memes">
        <ShowMemes />
      </Route>
    </Switch>
  );
};
