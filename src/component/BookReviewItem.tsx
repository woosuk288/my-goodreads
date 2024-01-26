import { useState } from "react";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Rating,
  SxProps,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMoreBar from "./ExpandMoreBar";

const sxBookReviewItem: SxProps = {
  ".review_profile_meta": {
    display: "flex",
    alignItems: "center",
    marginLeft: "-2px",
  },

  ".review_profile_meta_col": {
    ":not(:first-of-type):before": {
      content: '"\\B7"',
      padding: "6px",
    },
  },
  ".review_profile_meta_col.rating": {
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
};

export default function BookReviewItem() {
  const [show, setShow] = useState(false);

  const handleShowMore = () => {
    setShow(!show);
  };

  return (
    <Card sx={sxBookReviewItem} className="book_review_item">
      <CardHeader
        // disableTypography
        avatar={
          <Avatar sx={{ bgcolor: "primary.light" }} aria-label="review">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography color="secondary" fontWeight={500}>
            Jacek Ambroziak
          </Typography>
        }
        subheader={
          <>
            <div className="review_profile_meta">
              <div className="review_profile_meta_col rating">
                <Rating className="static_stars" name="read-only" value={1} max={1} readOnly size="small" />
                <Typography component="span" fontSize="0.875rem">
                  5
                </Typography>
              </div>
              <div className="review_profile_meta_col reviews">
                <Typography component="span" fontSize="0.875rem">
                  11 reviews
                </Typography>
              </div>
              <div className="review_profile_meta_col followers">
                <Typography component="span" fontSize="0.875rem">
                  <span>112 followers</span>
                </Typography>
              </div>
            </div>

            <div className="review_date">
              <Typography fontSize="0.8125rem" color="text.secondary">
                {new Date().toLocaleString().slice(0, -3)}
              </Typography>
            </div>
          </>
        }
      />

      <CardContent>
        <Collapse in={show} collapsedSize={160}>
          <div>
            I thoroughly enjoyed the book even if I have found myself in violent disagreement with many of its thoughts. The book opens up
            with these words.
            <br />
            <br />
            <blockquote>
              "Every moment in business happens only once.
              <br />
              <br />
              The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. And the
              next Mark Zuckerberg won’t create a social network. If you are copying these guys, you aren’t learning from them.
              <br />
              <br />
              It’s easier to copy a model than to make something new: doing what we already know how to do takes the world from 1 to n,
              adding more of something familiar. But every time we create something new, we go from 0 to 1. The act of creation is singular,
              as is the moment of creation, and the result is something fresh and strange."
            </blockquote>
            <br />
            <br />
            Initially, I kind of liked this quote. It is indeed hard to imagine a new business to threaten the dominance of Google Search or
            Facebook's social network. But the fact that Google search dominates is not really a zero-to-one effect, but a decisive
            improvement over previously existing internet search engines. Facebook was not originally conceived of as a dominant social
            platform; it so happened that it turned out to be well liked by millions of people beyond the original community of Harvard
            students. In operating systems we already have Linux and Android (using Linux) which have way more deployments than Windows. So
            it is not the case that "every moment in business" happens only once, unless in a very literal sense.
            <br />
            <br />
            Peter discusses "copying" with disdain, but not all "copying" is just copying, a lot of progress happens via semi-continuous
            improvements. This civilization does not only progress by one-off disruptive inventions. A lot of it is steady improvements. And
            these improvements occasionally lead to <i>enabling</i> zero-to-one (or dominating) developments.
            <br />
            <br />
            Peter asks "What company is nobody building?" Like the previous quote, this question has some charm, but I think it too is
            misleading. Well, maybe nobody is building this "company X" yet, because it is not yet <i>fully enabled</i>. Eg. voice over
            internet existed in the lab (IBM?) since mid 70's, but Skype made sense only much later when lots of people got access to
            personal computers and these computers started being connected to the Net all the time. <br />
            <br />
            Bottom line: it is not all "zero to one", nor it can be or should be.
            <br />
            <br />I still give the book 5 stars as I enjoyed its thought provoking character; it was an engaging reading: disagreeing,
            agreeing, learning new perspectives. Highly recommended but please don't treat it as Gospel :-)
          </div>
        </Collapse>
        <ExpandMoreBar show={show} onShowMore={handleShowMore} />
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to thumups">
          <ThumbUpOutlinedIcon fontSize="small" sx={{ alignSelf: "end" }} />
          <Typography fontSize="0.875rem" marginLeft="4px">
            500
          </Typography>
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineOutlinedIcon fontSize="small" />
          <Typography fontSize="0.875rem" marginLeft="4px">
            36
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
