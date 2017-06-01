module VideosHelper
  def default_intro(video)
    return cl_video_tag("default_intro", controls: true) if video
    cl_video_tag(video.private_id, controls: true, transformation: @overlays)
  end
end
